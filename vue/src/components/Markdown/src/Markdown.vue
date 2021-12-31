<template>
  <div ref="wrapRef"></div>
</template>
<script lang="ts">
  import {
    defineComponent,
    ref,
    unref,
    nextTick,
    computed,
    watch,
    onBeforeUnmount,
    onDeactivated
  } from 'vue';
  import Vditor from 'vditor';
  import 'vditor/dist/index.css';
  import { useLocale } from '/@/locales/useLocale';
  import { useModalContext } from '../../Modal';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';
  import { useGlobSetting } from '/@/hooks/setting';
  import { defHttp } from '/@/utils/http/axios';
  type Lang = 'zh_CN' | 'en_US' | 'ja_JP' | 'ko_KR' | undefined;

  export default defineComponent({
    inheritAttrs: false,
    props: {
      height: { type: Number, default: 360 },
      value: { type: String, default: '' }
    },
    emits: ['change', 'get', 'update:value'],
    setup(props, { attrs, emit }) {
      const filedata = ref();
      const wrapRef = ref<ElRef>(null);
      const vditorRef = ref<Nullable<Vditor>>(null);
      const initedRef = ref(false);
      const modalFn = useModalContext();

      const { getLocale } = useLocale();
      const { getDarkMode } = useRootSetting();
      const valueRef = ref('');

      watch(
        [() => getDarkMode.value, () => initedRef.value],
        ([val, inited]) => {
          if (!inited) {
            return;
          }
          const theme = val === 'dark' ? 'dark' : 'classic';
          instance.getVditor()?.setTheme(theme);
        },
        {
          immediate: true,
          flush: 'post'
        }
      );
      watch(
        () => props.value,
        (v) => {
          if (v !== valueRef.value) {
            instance.getVditor()?.setValue(v);
          }
          valueRef.value = v;
        }
      );
      const { uploadUrl = '' } = useGlobSetting();
      const getCurrentLang = computed((): 'zh_CN' | 'en_US' | 'ja_JP' | 'ko_KR' => {
        let lang: Lang;
        switch (unref(getLocale)) {
          case 'en':
            lang = 'en_US';
            break;
          case 'ja':
            lang = 'ja_JP';
            break;
          case 'ko':
            lang = 'ko_KR';
            break;
          default:
            lang = 'zh_CN';
        }
        return lang;
      });
      function init() {
        const wrapEl = unref(wrapRef) as HTMLElement;
        if (!wrapEl) return;
        const bindValue = { ...attrs, ...props };
        const insEditor = new Vditor(wrapEl, {
          theme: getDarkMode.value === 'dark' ? 'dark' : 'classic',
          lang: unref(getCurrentLang),
          mode: 'sv',
          preview: {
            actions: []
          },
          input: (v) => {
            valueRef.value = v;
            emit('update:value', v);
            emit('change', v);
          },
          upload: {
            withCredentials: false,
            accept: 'image/jpg, image/jpeg, image/png',
            url: uploadUrl + '/api/service/file/upload/avatar',
            multiple: true,
            async handler(files: File[]): string | null {
              console.log([files], 0);
              await uploadasd(files[0]);
              insEditor.insertValue(
                `![](http://localhost:3200/dev/api/service/file/preview?Key=` +
                  filedata.value +
                  ')',
                true
              );
              return filedata.value;
            }
          },

          after: () => {
            nextTick(() => {
              modalFn?.redoModalHeight?.();
              insEditor.setValue(valueRef.value);
              vditorRef.value = insEditor;
              initedRef.value = true;
              emit('get', instance);
            });
          },
          ...bindValue,
          cache: {
            enable: false
          }
        });
      }

      const instance = {
        getVditor: (): Vditor => vditorRef.value!
      };
      async function uploadasd(files: string | Blob) {
        let formData = new FormData();
        formData.append('file', files);
        var formFile = formData;
        if (formFile != null) {
          var obj = await defHttp.post(
            { url: '/api/service/file/Notice', params: formFile },
            { isTransformResponse: true }
          );
          filedata.value = obj.data;
        }
      }
      function destroy() {
        const vditorInstance = unref(vditorRef);
        if (!vditorInstance) return;
        try {
          vditorInstance?.destroy?.();
        } catch (error) {}
        vditorRef.value = null;
        initedRef.value = false;
      }
      onMountedOrActivated(init);

      onBeforeUnmount(destroy);
      onDeactivated(destroy);
      return {
        wrapRef,
        ...instance
      };
    }
  });
</script>
