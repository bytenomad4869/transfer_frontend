<template>
  <div class="q-uploader column no-wrap full-width" style="height: 40vh">
    <div class="q-uploader__header">
      <div class="q-uploader__header-content column">
        <div class="flex flex-center no-wrap q-gutter-xs">
          <div class="col column justify-center">
            <div class="q-uploader__title">Verzeichnisse oder Dateien hinzufügen</div>
            <div class="q-uploader__subtitle">{{ totalSize() }} / 0.00%</div>
          </div>
          <a
            class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--dense"
            tabindex="0"
            role="button"
            ><span class="q-focus-helper"></span
            ><span
              class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
              ><i class="q-icon notranslate material-icons" aria-hidden="true" role="img">add_box</i
              ><input
                class="q-uploader__input overflow-hidden absolute-full"
                tabindex="-1"
                type="file"
                title=""
                multiple
                @change="addFiles" /></span
          ></a>
          <a
            class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--dense"
            tabindex="0"
            role="button"
            v-if="files.length !== 0 && acceptPolicy"
            @click="uploadFiles"
            ><span class="q-focus-helper"></span
            ><span
              class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
              ><i class="q-icon notranslate material-icons" aria-hidden="true" role="img"
                >cloud_upload</i
              ></span
            ></a
          >
        </div>
      </div>
    </div>
    <div class="q-uploader__list scroll">
      <div v-for="(file, index) in files" :key="index" class="q-uploader__file relative-position">
        <div class="q-uploader__file-header row flex-center no-wrap">
          <div class="q-uploader__file-header-content col">
            <div class="q-uploader__title">{{ file.name }}</div>
            <div class="q-uploader__subtitle row items-center no-wrap">
              {{ utils.format(file.size) }}
            </div>
          </div>
          <button
            class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--round q-btn--actionable q-focusable q-hoverable q-btn--dense"
            tabindex="0"
            type="button"
            @click="delFile(index)"
          >
            <span class="q-focus-helper"></span
            ><span
              class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
              ><i class="q-icon notranslate material-icons" aria-hidden="true" role="img"
                >clear</i
              ></span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Chunk, Item } from './models';
import * as utils from './utils';

export default {
  data() {
    return {
      files: [] as File[],
      chunkSize: (5 * 1024 * 1024) as number,
      paused: false as boolean,
      items: [] as Item[],
      utils,
    }
  },
  props: {
    acceptPolicy: Boolean,
  },
  methods: {
    addFiles(e: Event) {
      const target = e.target as HTMLInputElement;

      if (target.files) {
        const files: File[] = Array.from(target.files);

        files.forEach((file) => {
          this.files.push(file)
        });
      }
    },
    delFile(i: number) {
      this.files.splice(i, 1);
    },
    async uploadFiles() {
      const projectId: number = 1;
      let sessionId: string;

      // Initialize upload
      this.files.forEach((file) => {
        this.items.push({
          id: utils.uuid(true),
          fileName: file.name,
          path: file.webkitRelativePath === '' ? '/' : file.webkitRelativePath,
          totalChunks: Math.ceil(file.size / this.chunkSize),
        });
      });

      fetch('http://localhost:8080/upload/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.items),
      })
        .then((response) => response.json())
        .then((json) => {
          sessionId = json.sessionId;

          this.items.forEach((item) => {
            const file = this.files.find((f) => f.name === item.fileName);
            const uploads: Promise<Response>[] = [];

            for (let i = 0; i < item.totalChunks; i++) {
              const c: Chunk = {
                data: file.slice(i * this.chunkSize, (i + 1) * this.chunkSize),
                fileName: item.fileName,
                index: i,
                totalChunks: item.totalChunks,
              }

              const formData = new FormData();
              formData.append('fileName', c.fileName);
              formData.append('index', c.index.toString());
              formData.append('totalChunks', c.totalChunks.toString());
              formData.append('data', c.data);

              //uploads.push(
                fetch('http://localhost:8080/upload/', {
                method: 'POST',
                headers: {
                  'X-Session': sessionId,
                },
                body: formData,
              });//);
            }

            Promise.all(uploads);
          });
        });
    },
    pauseUpload() {
      this.paused = true
    },
    resumeUpload() {
      this.paused = false
    },
    totalSize(): string {
      let size: number = 0.0

      this.files.forEach((file) => {
        size += file.size
      })

      return utils.format(size)
    },
    progress() {},
  },
}
</script>

<style scoped></style>
