<script setup>
const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)

const items = [
  {
    slot: "name_and_status",
    label: "Nome e Status",
    icon: "material-symbols:favorite-outline",
    defaultOpen: true,
    action: () => console.log("Privacy"),
  },
]
</script>
<template>
  <section class="text-blue-950">
    <UAccordion
      :items="items"
      :ui="{
        wrapper: 'w-full flex flex-col text-primary',
        item: {
          base: 'text-blue-950 bg-blue-750',
          size: 'text-sm',
          color: 'text-gray-500 dark:text-gray-400',
          padding: 'px-3',
          icon: 'ms-auto transform transition-transform duration-200',
        },
      }"
    >
      <template #default="{ item, open }">
        <UButton
          color="gray"
          variant="ghost"
          class=""
          :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
        >
          <template #leading>
            <div class="w-10 h-10 flex items-center justify-center -my-1">
              <UIcon :name="item.icon" class="w-6 h-6 text-blue-950" />
            </div>
          </template>

          <span class="truncate text-blue-950"> {{ item.label }}</span>

          <template #trailing>
            <div class="ms-auto transform transition-transform duration-200">
              <UButton class="bg-blue-950 px-5" v-if="open" @click.prevent="item.action">
                Salvar
              </UButton>
              <UIcon
                v-if="!open"
                name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 ms-auto transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
              />
            </div>
          </template>
        </UButton>
      </template>

      <template #name_and_status>
        <section class="flex flex-col gap-4">
          <UFormGroup
            label="Nome"
            :ui="{
              label: {
                base: 'text-xs font-semibold text-gray-500',
              },
            }"
          >
            <UInput v-model="profile.name" />
          </UFormGroup>
          <UFormGroup
            label="Status"
            :ui="{
              label: {
                base: 'text-xs font-semibold text-gray-500',
              },
            }"
          >
            <UInput v-model="profile.description" />
          </UFormGroup>
        </section>
      </template>
    </UAccordion>
  </section>
</template>
