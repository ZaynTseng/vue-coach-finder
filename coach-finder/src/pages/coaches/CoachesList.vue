<template>
  <div>
    <base-dialog :show="!!error"
                 title="An error has occurred"
                 @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="fetchCoachData(true)">Refresh</base-button>
          <base-button link to="/register" v-if="!isCoach && !isLoading">Register</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item v-for="coach in filteredCoaches"
                      :key="coach.id"
                      :id="coach.id"
                      :first-name="coach.firstName"
                      :last-name="coach.lastName"
                      :areas="coach.areas"
                      :rate="coach.hourlyRate"></coach-item>
        </ul>
        <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "@/components/coaches/CoachItem.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import {handleError} from "vue";

export default {
  components: {BaseDialog, CoachFilter, BaseButton, BaseCard, CoachItem},
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        return this.activeFilters.career && coach.areas.includes("career");

      });
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"] && !this.isLoading;
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    }
  },
  methods: {
    handleError() {
      this.error = null;
    },
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async fetchCoachData(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {forceRefresh: refresh});
      } catch (e) {
        this.error = e.message;
      }
      this.isLoading = false;
    }
  },
  created() {
    this.fetchCoachData();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
