<template>
    <section id="demo" class="darker">
        <div class="container">
            <label for="input">Input</label>
            <label for="output">Output</label>
            <textarea id="input" spellcheck="false" v-model="inputValue"></textarea>
            <textarea id="output" spellcheck="false" readonly v-model="outputValue"></textarea>
            <div class="dropdown">
                <button class="dropbtn">Dropdown</button>
                <div class="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
  import { Vue, Prop, Watch, Component } from 'vue-property-decorator';
  import { Uwuifier } from 'uwuifier';

  @Component
  export default class Demo extends Vue {
    @Prop() settings: any;

    private uwuifier = new Uwuifier();

    private input = `Hey! This site can help you make any old boring text nice and uwu. We can't imagine anyone would actually use this, but you gotta do what you gotta do.`;

    get inputValue() {
      return this.input;
    }

    set inputValue(value) {
      this.input = value;
    }

    get outputValue() {
      return this.uwuifier.uwuifySentence(this.input);
    }

    @Watch('settings', { deep: true })
    onMyPropChanged(val: any, oldVal: any) {
      console.log(`Faces parameter: ${val.spaces.faces}`);
      console.log(`Actions parameter: ${val.spaces.actions}`);
      console.log(`Stutters parameter: ${val.spaces.stutters}`);
      this.uwuifier = new Uwuifier(val);
    }
  }
</script>

<style scoped>

.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  z-index: 100;
  /* display: none; */
    display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}




    #demo {
        display: flex;
        padding: 80px 0px 60px 0px;
        justify-content: center;
    }
    
    #demo .container {
        display: grid;
        grid-template-columns: 4fr 5fr;
        grid-template-rows: 40px 1fr auto;
        align-items: stretch;
        height: 500px;
        width: 1100px;
        box-shadow: 0 20px 25px 10px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border-radius: 6px;
        overflow: hidden;
    }

    #demo label {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
    }

    #demo label::before {
        content: '';
        width: 50px;
        height: 2px;
        background: currentColor;
        position: absolute;
        bottom: 0;
    }

    #demo label:first-of-type {
        background: var(--demo-io-background);
    }

    #demo label:last-of-type {
        background: var(--app-accent);
        color: #000;
    }

    textarea {
        font-family: inherit;
        border: none;
        outline: none;
        resize: none;
        background: none;
        color: inherit;
        font-size: 1.2rem;
        line-height: 1.8rem;
        font-weight: 300;
        padding: 20px;
    }

    #demo textarea:first-of-type {
        background: var(--demo-io-background);
        grid-area: span 2;
    }

    #demo textarea:last-of-type {
        background: var(--app-accent);
        color: #000;
    }

    @media screen and (max-width: 900px) {
        #demo .container {
            grid-template-columns: 1fr;
            grid-template-rows: 40px 1fr 40px 1fr;
        }

        #demo textarea:first-of-type {
            grid-area: 2;
        }
    }
</style>