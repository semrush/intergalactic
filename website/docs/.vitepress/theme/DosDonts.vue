<template>
  <table class="dosdonts">
    <colgroup>
      <col span="1" style="width: 50%" />
      <col span="1" style="width: 50%" />
    </colgroup>
    <thead>
      <tr>
        <th scope="col">Don't</th>
        <th scope="col">Do</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="dosdonts-cell">
            <slot name="dont"></slot>
          </div>
        </td>
        <td>
          <div class="dosdonts-cell">
            <slot name="do"></slot>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
