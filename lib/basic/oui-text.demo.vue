<script setup lang="ts">
import { reactive } from 'vue'
import { OuiCheckbox, OuiDemo, OuiText } from '@/lib'

const state = reactive({
  responsiveTables: true,
})
</script>

<template>
  <OuiText :responsive-tables="state.responsiveTables">
    <h1>Text</h1>

    <h1 class="blog-post-title">
      Sample blog post
    </h1>
    <p class="blog-post-meta">
      January 1, 2014 by <a href="#">Mark</a>
    </p>

    <p>
      This blog post shows a few different types of content that's supported and
      styled with Bootstrap. Basic typography, images, and code are all
      supported.
    </p>
    <hr>
    <p>
      Cum sociis natoque penatibus et magnis
      <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu
      leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed
      posuere consectetur est at lobortis. <a href="#">Regular Link</a> Cras mattis consectetur purus sit
      amet fermentum. <a class="oui-button" href="https://holtwick.de" target="_blank">Button Link</a>
    </p>
    <blockquote>
      <p>
        <i>Info</i> Curabitur blandit tempus porttitor.
        <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo.
        Nullam id dolor id nibh ultricies vehicula ut id elit.
      </p>
    </blockquote>
    <p>
      Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis
      consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed
      consectetur.
    </p>
    <h2><a name="sample" class="anchor" href="#sample">Heading</a></h2>
    <p>
      Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
      lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac,
      vestibulum at eros.
    </p>
    <h3>Sub-heading</h3>
    <p>
      Cum sociis natoque penatibus et magnis <code>props</code> dis parturient
      montes, nascetur ridiculus mus.
    </p>
    <pre><code class="lang-js">site.handle(<span class="hljs-regexp">/.*\.md/</span>, (content, path) =&gt; {
<span class="hljs-keyword">let</span> $ = site.readDOM(<span class="hljs-string">'template.html'</span>)
<span class="hljs-keyword">let</span> htmlPath = path.replace(<span class="hljs-regexp">/\.md$/</span>, <span class="hljs-string">'.html'</span>)
<span class="hljs-keyword">let</span> md = parseMarkdown(content)
<span class="hljs-keyword">let</span> title = md.props.title
$(<span class="hljs-string">'title'</span>).text(<span class="hljs-string">`<span class="hljs-subst">${title}</span> - My Website`</span>)
$(<span class="hljs-string">'#title'</span>).text(title)
$(<span class="hljs-string">'#content'</span>).html(md.html)
site.write(htmlPath, $.html())
})
</code></pre>
    <p>
      Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada
      magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor
      mauris condimentum nibh, ut fermentum massa.
    </p>

    <h3>Sub-heading</h3>
    <p>
      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta
      sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus
      commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet
      risus.
    </p>
    <ul>
      <li>
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
      </li>
      <li>Donec id elit non mi porta gravida at eget metus.</li>
      <li>Nulla vitae elit libero, a pharetra augue.</li>
    </ul>
    <p>
      Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit
      libero, a pharetra augue.
    </p>
    <ol>
      <li>Vestibulum id ligula porta felis euismod semper.</li>
      <li>
        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus.
      </li>
      <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>
    </ol>
    <p>
      Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur
      est at lobortis.
    </p>
    <h1>Header 1</h1>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </p>
    <h2>Header 2</h2>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </p>
    <h3>Header 3</h3>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </p>
    <h4>Header 4</h4>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </p>
    <h5>Header 5</h5>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </p>
    <p>
      <img
        src="https://holtwick.de/icon.png"
        alt="Icon"
      >
    </p>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </p>

    <h1>Text Demo</h1>
    <p>
      <b>Lorem ipsum</b> <i>dolor sit amet</i>
      <u>consectetur adipisicing</u> elit. <mark>Consectetur</mark>,
      <s>nobis mollitia</s>! Recusandae quia quibusdam, consectetur consequatur
      vitae necessitatibus animi sunt officiis vero. Fuga autem magnam doloribus
      qui dicta nesciunt unde.
    </p>
    <ol>
      <li>One</li>
      <li>Two</li>
      <li>
        Three
        <ul>
          <li>One</li>
          <li>Two</li>
        </ul>
      </li>
      <li>Four</li>
      <li>Five</li>
      <li>Six</li>
      <li>Seven</li>
      <li>Eight</li>
      <li>Nine</li>
      <li>Ten</li>
      <li>Elven</li>
      <li>Twelve</li>
    </ol>
    <p>Paragraph Paragraph Paragraph</p>
    <pre>print(123)</pre>

    <h2>Table</h2>
    <p>
      The following table stacks vertically on small viewports when
      <code>responsiveTables</code> is enabled. Each <code>td</code> uses a
      <code>data-label</code> attribute that is shown above the value.
    </p>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Name"><code>title</code></td>
          <td data-label="Type"><code>string</code></td>
          <td data-label="Description">The title of the entry.</td>
        </tr>
        <tr>
          <td data-label="Name"><code>count</code></td>
          <td data-label="Type"><code>number</code></td>
          <td data-label="Description">How many items the entry contains.</td>
        </tr>
        <tr>
          <td data-label="Name"><code>active</code></td>
          <td data-label="Type"><code>boolean</code></td>
          <td data-label="Description">Whether the entry is currently active.</td>
        </tr>
      </tbody>
    </table>
  </OuiText>
  <OuiDemo :state="state">
    <OuiCheckbox v-model="state.responsiveTables" switch title="responsiveTables" />
  </OuiDemo>
</template>
