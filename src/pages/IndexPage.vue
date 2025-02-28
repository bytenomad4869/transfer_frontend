<template>
  <div class="q-pa-md">
    <div class="row justify-center q-mb-xl">
      <div class="col-8">
        <div class="text-h4">Dateiupload</div>
      </div>
    </div>
    <div class="row justify-center items-center q-mb-md">
      <div class="col-4 text-body1">Projektname:</div>
      <div class="col-4">
        <!-- TODO: Add project -->
        <q-select
          filled
          v-model="projects"
          use-input
          input-debounce="0"
          label="Projekt anlegen oder suchen"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">Keine Projekte vorhanden</q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="row justify-center items-center q-mb-sm">
      <div class="col-4 text-body1">Speicherdauer:</div>
      <div class="col-4">
        <q-select filled v-model="storagePeriod" :options="['6 Monate', '10 Jahre']" label="Speicherdauer" />
      </div>
    </div>
    <div class="row justify-center q-mb-md">
      <div class="col-8">
        <q-checkbox
          v-model="acceptPolicy"
          label="Hiermit bestätige ich, dass die Daten sicherheitlich geprüft wurden und keine Schadsoftware enthalten."
          color="teal"
        />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-8">
        <FileUpload />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FileUpload from 'src/components/FileUpload.vue';

export default {
  components: {
    FileUpload
  },
}
</script>
