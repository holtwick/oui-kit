<script setup lang="ts">
import type { LoggerInterface } from 'zeed'
import { onMounted, ref } from 'vue'
import { Logger } from 'zeed'
import { tt } from '@/basic/i18n'

import './css-vars.demo.styl'

const log: LoggerInterface = Logger('css-vars.demo')

interface CSSVariable {
  name: string
  value: string
  isColor: boolean
  children?: CSSVariable[]
  referencedVar?: string
  isRootLevel: boolean
}

const cssVariables = ref<CSSVariable[]>([])
const groupByReference = ref(false)
const showPrivateOnly = ref(false)
const showRootOnly = ref(false)

function isColorValue(value: string): boolean {
  // Check if the value looks like a color (hex, rgb, hsl, color names, etc.)
  const colorRegex = /^(?:#[0-9a-f]{3,8}|rgb\(|rgba\(|hsl\(|hsla\(|[a-z]+)$/i
  return colorRegex.test(value.trim())
}

function extractReferencedVar(value: string): string | undefined {
  const varMatch = value.match(/var\(\s*(--[^),\s]+)/)
  return varMatch ? varMatch[1] : undefined
}

function getAllCSSVariables(): CSSVariable[] {
  const variables: CSSVariable[] = []
  const rootVariables = new Set<string>()
  const allStyles = document.styleSheets

  // First, identify root-level variables
  try {
    const rootStyles = getComputedStyle(document.documentElement)
    for (let i = 0; i < rootStyles.length; i++) {
      const property = rootStyles[i]
      if (property.startsWith('--')) {
        rootVariables.add(property)
      }
    }
  }
  catch (e) {
    log.error('Error getting root CSS variables', e)
  }

  try {
    for (let i = 0; i < allStyles.length; i++) {
      const styleSheet = allStyles[i]
      try {
        const rules = styleSheet.cssRules || styleSheet.rules
        for (let j = 0; j < rules.length; j++) {
          const rule = rules[j] as CSSStyleRule
          if (rule.style) {
            for (let k = 0; k < rule.style.length; k++) {
              const property = rule.style[k]
              if (property.startsWith('--')) {
                const value = rule.style.getPropertyValue(property)
                if (value && !variables.some(v => v.name === property)) {
                  variables.push({
                    name: property,
                    value: value.trim(),
                    isColor: isColorValue(value),
                    referencedVar: extractReferencedVar(value),
                    isRootLevel: rootVariables.has(property),
                  })
                }
              }
            }
          }
        }
      }
      catch (e) {
        // Skip stylesheets that can't be accessed (CORS)
        log.debug('Cannot access stylesheet', e)
      }
    }

    // Also get computed style variables from :root
    const rootStyles = getComputedStyle(document.documentElement)
    for (let i = 0; i < rootStyles.length; i++) {
      const property = rootStyles[i]
      if (property.startsWith('--')) {
        const value = rootStyles.getPropertyValue(property)
        if (value && !variables.some(v => v.name === property)) {
          variables.push({
            name: property,
            value: value.trim(),
            isColor: isColorValue(value),
            referencedVar: extractReferencedVar(value),
            isRootLevel: true,
          })
        }
      }
    }
  }
  catch (e) {
    log.error('Error getting CSS variables', e)
  }

  return variables.sort((a, b) => a.name.localeCompare(b.name))
}

function groupVariablesByReference(variables: CSSVariable[]): CSSVariable[] {
  if (!groupByReference.value) {
    return variables
  }

  const grouped: CSSVariable[] = []
  const variableMap = new Map<string, CSSVariable>()

  // Create a map of all variables
  variables.forEach((variable) => {
    variableMap.set(variable.name, { ...variable, children: [] })
  })

  // Group variables by their references
  variables.forEach((variable) => {
    const varCopy = variableMap.get(variable.name)!

    if (variable.referencedVar && variableMap.has(variable.referencedVar)) {
      // This variable references another one, add it as a child
      const parent = variableMap.get(variable.referencedVar)!
      if (!parent.children)
        parent.children = []
      parent.children.push(varCopy)
    }
    else {
      // This is a root variable (doesn't reference another CSS var)
      grouped.push(varCopy)
    }
  })

  return grouped.sort((a, b) => a.name.localeCompare(b.name))
}

function filterVariables(variables: CSSVariable[]): CSSVariable[] {
  if (showPrivateOnly.value) {
    return variables.filter(variable => !variable.isRootLevel)
  }
  if (showRootOnly.value) {
    return variables.filter(variable => variable.isRootLevel)
  }
  return variables
}

onMounted(() => {
  const allVars = getAllCSSVariables()
  const filteredVars = filterVariables(allVars)
  cssVariables.value = groupVariablesByReference(filteredVars)
})

function updateGrouping() {
  const allVars = getAllCSSVariables()
  const filteredVars = filterVariables(allVars)
  cssVariables.value = groupVariablesByReference(filteredVars)
}
</script>

<template>
  <div class="_css_vars oui-css-vars">
    <h1>{{ tt('CSS Variables', 'oui.cssVars.title') }}</h1>

    <div class="_controls">
      <label class="_checkbox_label">
        <input
          v-model="groupByReference"
          type="checkbox"
          @change="updateGrouping"
        >
        {{ tt('Group by reference', 'oui.cssVars.groupByReference') }}
      </label>

      <label class="_checkbox_label">
        <input
          v-model="showPrivateOnly"
          type="checkbox"
          @change="updateGrouping"
        >
        {{ tt('Show private variables only', 'oui.cssVars.showPrivateOnly') }}
      </label>

      <label class="_checkbox_label">
        <input
          v-model="showRootOnly"
          type="checkbox"
          @change="updateGrouping"
        >
        {{ tt('Show root variables only', 'oui.cssVars.showRootOnly') }}
      </label>
    </div>

    <div class="_variables_list">
      <div
        v-for="variable in cssVariables"
        :key="variable.name"
        class="_variable_item"
        :class="{ _has_children: variable.children && variable.children.length > 0 }"
      >
        <div class="_variable_name">
          {{ variable.name }}
        </div>
        <div class="_variable_value">
          <span
            v-if="variable.isColor"
            class="_color_sample"
            :style="{ backgroundColor: `var(${variable.name})` }"
          />
          <code>{{ variable.value }}</code>
        </div>

        <!-- Child variables -->
        <div v-if="variable.children && variable.children.length > 0" class="_children">
          <div
            v-for="child in variable.children"
            :key="child.name"
            class="_variable_item _child_item"
          >
            <div class="_variable_name">
              {{ child.name }}
            </div>
            <div class="_variable_value">
              <span
                v-if="child.isColor"
                class="_color_sample"
                :style="{ backgroundColor: `var(${child.name})` }"
              />
              <code>{{ child.value }}</code>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="cssVariables.length === 0" class="_no_variables">
      {{ tt('No CSS variables found', 'oui.cssVars.noVariables') }}
    </div>
  </div>
</template>
