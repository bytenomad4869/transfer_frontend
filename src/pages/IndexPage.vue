<template>
  <div class="q-pa-md">
    <div class="row justify-center q-mb-xl">
      <div class="col-8">
        <div class="text-h4">Dateiupload</div>
      </div>
    </div>
    <div class="row justify-center items-center q-mb-md">
      <div class="col-4 text-body1">Speichertopf:</div>
      <div class="col-4">
        <q-select
          filled
          v-model="buckets"
          use-input
          input-debounce="0"
          label="Speichertopf anlegen oder suchen"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">Keine Speichertöpfe vorhanden</q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="row justify-center items-center q-mb-sm">
      <div class="col-4 text-body1">Speicherdauer:</div>
      <div class="col-4">
        <q-select filled v-model="storagePeriod" :options="storageOptions" label="Speicherdauer" map-options />
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
        <FileUpload :acceptPolicy="acceptPolicy" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FileUpload from 'src/components/FileUpload.vue';

export default {
  data() {
    return {
      buckets: [],
      storagePeriod: 0,
      storageOptions: [
        { label: '6 Monate', value: 0 },
        { label: '10 Jahre', value: 1 }
      ],
      acceptPolicy: false,
    }
  },
  components: {
    FileUpload
  },
}
</script>
