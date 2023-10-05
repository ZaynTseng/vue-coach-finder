<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid : !firstName.isValid}">
      <label for="firstname">First Name</label>
      <input type="text" id="firstname" v-model.trim="firstName.value" @blur="validateFirstName"/>
      <p v-if="!firstName.isValid">Please fill in your first name.</p>
    </div>
    <div class="form-control" :class="{invalid : !lastName.isValid}">
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model.trim="lastName.value" @blur="validateLastName"/>
      <p v-if="!lastName.isValid">Please fill in your last name.</p>
    </div>
    <div class="form-control" :class="{invalid : !description.isValid}">
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model="description.value" @blur="validateDesc"></textarea>
      <p v-if="!description.isValid">Please fill in some descriptions.</p>
    </div>
    <div class="form-control" :class="{invalid : !hourlyRate.isValid}">
      <label for="hourlyRate">Hourly Rate</label>
      <input type="number" id="hourlyRate" v-model.number="hourlyRate.value" @blur="validateRate"/>
      <p v-if="!hourlyRate.isValid">Please fill in your hourly rate.</p>
    </div>
    <div class="form-control" :class="{invalid : !areas.isValid}">
      <h3>Areas of Expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas.value" @blur="validateAreas"/>
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas.value" @blur="validateAreas"/>
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas.value" @blur="validateAreas"/>
        <label for="career">Career Coaching</label>
      </div>
      <p v-if="!areas.isValid">Please select your areas of expertise.</p>
    </div>
    <p v-if="!formIsValid">Please check your inputs again...</p>
    <base-button>Submit</base-button>
  </form>
</template>

<script>
export default {
  emits: ["submit-form"],
  data() {
    return {
      firstName: {
        value: "",
        isValid: true
      },
      lastName: {
        value: "",
        isValid: true
      },
      description: {
        value: "",
        isValid: true
      },
      hourlyRate: {
        value: null,
        isValid: true
      },
      areas: {
        value: [],
        isValid: true
      },
      formIsValid: true,
    };
  },
  methods: {
    validateFirstName() {
      this.firstName.isValid = true;
      if (this.firstName.value === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
    },
    validateLastName() {
      this.lastName.isValid = true;
      if (this.lastName.value === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
    },
    validateDesc() {
      this.description.isValid = true;
      if (this.description.value === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
    },
    validateRate() {
      this.hourlyRate.isValid = true;
      if (!this.hourlyRate.value || this.hourlyRate.value < 0) {
        this.hourlyRate.isValid = false;
        this.formIsValid = false;
      }
    },
    validateAreas() {
      this.areas.isValid = true;
      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    validateForm() {
      this.formIsValid = true;
      this.validateFirstName();
      this.validateLastName();
      this.validateDesc();
      this.validateRate();
      this.validateAreas();
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        description: this.description.value,
        hourlyRate: this.hourlyRate.value,
        areas: this.areas.value
      };
      this.$emit("submit-form", formData);
    }
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
