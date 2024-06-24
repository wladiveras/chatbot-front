<script lang="ts" setup>
const page = reactive({
  items: [
    {
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
      author: {
        name: "@anabela",
        description: "Head de vendas",
        avatar: {
          src: "https://i.pravatar.cc/120?img=1",
        },
      },
    },
    {
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
      author: {
        name: "@roberta",
        description: "Time comercial",
        avatar: {
          src: "https://i.pravatar.cc/120?img=7",
        },
      },
    },
    {
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
      author: {
        name: "@amanda",
        description: "Head de vendas",
        avatar: {
          src: "https://i.pravatar.cc/120?img=3",
        },
      },
    },
  ],
})
</script>
<template>
  <ULandingSection id="testimonials">
    <div class="mt-[50px]">
      <div class="text-center max-w-[610px] m-auto relative">
        <UBadge class="text-pink-600 bg-pink-50"> Além das expectativas</UBadge>
        <h1 class="text-[32px] font-bold primary-color flex flex-wrap justify-center">
          <span>O que nossos clientes dizem</span>
        </h1>
      </div>

      <UPageColumns class="mt-10">
        <div
          v-for="(testimonial, index) in page.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial
            :ui="{
              body: {
                base: 'flex flex-col ',
                padding: '4',
              },
              wrapper: 'relative',
              quote: 'text-gray-400',
              icon: {
                wrapper: 'mb-6 flex',
                base: 'w-8 h-8 flex-shrink-0 text-gray-500',
              },
              author: {
                wrapper: 'flex items-center gap-3 mt-6 relative',
                name: 'font-semibold text-pink-500 text-sm',
                description: 'text-gray-500 text-sm',
                avatar: {
                  base: '',
                  size: 'md',
                },
              },
            }"
            v-bind="testimonial"
          />
        </div>
      </UPageColumns>
    </div>
  </ULandingSection>
</template>

<style></style>
