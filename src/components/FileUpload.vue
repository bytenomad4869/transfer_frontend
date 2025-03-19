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
            <div class="q-uploader__subtitle row items-center no-wrap">{{ format(file.size) }}</div>
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
import type { Chunk } from './models'

export default {
  data() {
    return {
      files: [] as File[],
      chunkSize: (5 * 1024 * 1024) as number,
      paused: false as boolean,
    }
  },
  props: {
    acceptPolicy: Boolean,
  },
  methods: {
    addFiles(e: Event) {
      const target = e.target as HTMLInputElement

      if (target.files) {
        const files: File[] = Array.from(target.files)

        files.forEach((file) => {
          // Check for duplicates
          this.files.push(file)
          console.log(file)
        })
      }
    },
    delFile(i: number) {
      this.files.splice(i, 1)
    },
    async uploadFiles() {
      const projectId: number = 1
      const fileName = this.files.map((file) => {
        name: file.name,

      })

      // Initialize upload
      const response = await fetch('http://localhost:8080/upload/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fileName),
      })

      // for (const file of this.files) {
      //   const totalChunks: number = Math.ceil(file.size / this.chunkSize)
      //
      //   for (let i = 0; i < totalChunks; i++) {
      //     document.cookie = `currentFile=${encodeURIComponent(file.name)}; path=/`
      //     document.cookie = `index=${i}; path=/`
      //
      //     const data: Blob = file.slice(i * this.chunkSize, (i + 1) * this.chunkSize);
      //
      //     const chunk: Chunk = {
      //       filename: file.name,
      //       index: i,
      //       totalChunks: totalChunks,
      //     }
      //
      //     const formData = new FormData();
      //     formData.append("data", data);
      //     formData.append("meta", JSON.stringify(chunk));
      //
      //     const response = await fetch('http://127.0.0.1:8080/upload/' + projectId, {
      //       method: 'POST',
      //       body: formData,
      //     })
      //   }
      //}
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

      return this.format(size)
    },
    format(s: number): string {
      if (s === 0) return '0,00 B'

      const base: number = 1024
      const unit: string[] = ['B', 'KB', 'MB', 'GB', 'TB']

      // Calculate how often base number fits into given file size
      let x: number = Math.floor(Math.log(s) / Math.log(base))

      // If we deal with petabyte sizes or larger, clamp x to terabyte size format
      x = x > 4 ? 4 : x

      return (s / Math.pow(base, x)).toFixed(2).replace('.', ',') + ' ' + unit[x]
    },
    progress() {},
  },
}
</script>

<style scoped></style>
