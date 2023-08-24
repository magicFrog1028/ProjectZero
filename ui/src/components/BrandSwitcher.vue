<template>
  <Menu as="div" class="w-full h-20" v-slot="{ open }">
    <MenuButton
      class="h-full w-full bg-gray-100 rounded text-gray-900 px-5 hover:bg-gray-200"
    >
      <div class="flex flex-row items-center">
        <img
          class="flex-none h-9 w-9 rounded-full"
          :src="props.curChoice.brandLogo"
          alt=""
        />
        <div :class="[props.sidebarTail ? 'hidden' : '', 'grow shrink-0']">
          <p class="text-lg font-medium text-gray-700 font-semibold">
            {{ props.curChoice.brandName }}
          </p>
          <p class="text-xs font-medium text-gray-500">
            {{ props.curChoice.brandMetadata }}
          </p>
        </div>
        <ChevronDownIcon
          :class="[
            props.sidebarTail ? 'hidden' : '',
            open ? 'rotate-180' : '',
            'h-5 w-5 text-gray-400 flex-none shrink-0 mr-2'
          ]"
          aria-hidden="true"
        />
      </div>
    </MenuButton>
    <!-- 弹出菜单-->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        :class="props.sidebarTail ? 'w-64' : 'w-full'"
        class="absolute mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none px-5 py-3"
      >
        <!-- 品牌按钮-->
        <MenuItem
          v-slot="{ active }"
          v-for="item in props.otherChoices"
          :key="item.brandName"
        >
          <button
            @click="handleChangeBrand(item.id)"
            :class="[
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'block w-full px-0 mb-3 text-left rounded'
            ]"
          >
            <div class="flex flex-row items-center w-full">
              <img
                class="h-9 w-10 rounded-full flex-none"
                :src="item.brandLogo"
                :alt="item.brandName"
              />
              <div class="grow shrink-0 pl-5">
                <p class="text-lg font-medium text-gray-700">
                  {{ item.brandName }}
                </p>
                <p class="text-xs font-medium text-gray-500">
                  {{ item.brandMetadata }}
                </p>
              </div>
            </div>
          </button>
        </MenuItem>
        <hr class="border-slate-300 border-t-1" />
        <MenuItem
          v-slot="{ active }"
          v-for="item in props.operations"
          :key="item.name"
        >
          <button
            @click="console.log('clock')"
            :class="[
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              ' w-full px-0 mt-3 pl-1 text-left text-sm flex gap-x-3 '
            ]"
          >
            <component
              :is="item.icon"
              class="h-8 w-8 shrink-0 text-gray-400 roup-hover:text-indigo-600"
              aria-hidden="true"
            />
            <p class="text-lg font-medium text-gray-500">{{ item.name }}</p>
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
const props = defineProps({
  curChoice: {
    type: Object,
    required: true
  },
  otherChoices: {
    type: Array,
    required: true
  },
  operations: {
    type: Array
  },
  sidebarTail: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['changeBrand'])
function handleChangeBrand(id) {
  emit('changeBrand', id)
}
</script>

<style lang="scss" scoped></style>
