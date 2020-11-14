<template>
  <section id="settings" class="darker">
    <div class="container">
      <h3>Spaces</h3>
      <div>
        <h5>Faces</h5>
        <input type="range" min="0" max="1" step="0.01" @change="updatedSettings" v-model="settings.spaces.faces">

        <h5>Actions</h5>
        <input type="range" min="0" max="1" step="0.01" @change="updatedSettings" v-model="settings.spaces.actions">

        <h5>Stutters</h5>
        <input type="range" min="0" max="1" step="0.01" @change="updatedSettings" v-model="settings.spaces.stutters">
      </div>

      <hr>

      <h3>Words</h3>
      <div>
        <input type="range" min="0" max="1" step="0.01" @change="updatedSettings" v-model="settings.words">
      </div>

      <hr>

      <h3>Exclamations</h3>
      <div>
        <input type="range" min="0" max="1" step="0.01" @change="updatedSettings" v-model="settings.exclimations">
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Settings extends Vue { 
      private settings = {
        spaces: {
          exclimations: 1,
          stutters: 0.1,
          actions: 0.075,
        },
        faces: 0.5,
        words: 1
      }

      updatedSettings(): void {
        this.$emit('updatedSettings', this.settings);
      }
      
  }
</script>

<style>
    #settings {
        display: flex;
        padding: 60px 0px 80px 0px;
        justify-content: center;
    }
    
    #settings .container {
        display: grid;
        grid-template-columns: 9fr;
        grid-template-rows: 40px;
        align-items: stretch;
        justify-items: stretch;
        width: 1100px;
        overflow: hidden;
    }

    .block {
      border-color: var(--section-darker-background);
      border-width: 1px;
      border-style: solid;
    }

    hr {
      margin: 12px 0px;
      height: 0px;

      border-top: 1px;
      border-left: 0px;
      border-right: 0px;
      border-bottom: 0px;
      border-style: solid;
      border-color: rgba(31, 31, 31, .15);
    }

    h3 {
        margin-bottom: 6px;
      }

      h5 {
        margin-bottom: 6px;
      }

      input[type=range] {
        width: 100%;
      }
</style>