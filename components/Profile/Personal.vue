<script setup>
const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);

const items = [
  {
    slot: 'name_and_status',
    label: 'Nome e Status',
    icon: 'material-symbols:favorite-outline',
    defaultOpen: true,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
  },
  {
    slot: 'privacy',
    label: 'Privacidade',
    icon: 'material-symbols:lock-outline',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
  }
]
</script>
<template>
  <section class="text-blue-950">
    <UAccordion 
      :items="items"
      :ui="{
        wrapper: 'w-full flex flex-col',
        item: {
          base: 'text-blue-950',
          size: 'text-sm',
          color: 'text-gray-500 dark:text-gray-400',
          padding: 'px-3',
          icon: 'ms-auto transform transition-transform duration-200',
        }
      }"
    >
      <template #name_and_status>
        <section class="flex flex-col gap-4">
          <UFormGroup 
            label="Nome"
            :ui="{
              label: {
                base: 'text-xs font-semibold text-gray-500'
              }
            }"
          >
            <UInput v-model="profile.name" />
          </UFormGroup>
          <UFormGroup 
            label="Status"
            :ui="{
              label: {
                base: 'text-xs font-semibold text-gray-500'
              }
            }"
          >
            <UInput v-model="profile.description" />
          </UFormGroup>
        </section>
      </template>
    </UAccordion>
  </section>
</template>