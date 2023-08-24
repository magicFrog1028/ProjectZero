<template>
  <nav class="flex flex-1 flex-col px-5">
    <ul role="list" class="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" class="space-y-1">
          <li v-for="item in props.navigation" :key="item.name">
            <router-link
              v-if="!item.children"
              :to="item.href"
              @click="handleChangeNav(item.href)"
              :class="[
                menuStyle(item.current),
                'group flex gap-x-3 rounded-md p-2 text-m leading-6'
              ]"
            >
              <component
                :is="item.icon"
                :class="['h-6 w-6 shrink-0']"
                aria-hidden="true"
              />
              <div class="shrink-0">
                {{ props.sidebarTail ? '' : item.name }}
              </div>
            </router-link>
            <Disclosure
              as="div"
              v-else-if="!props.sidebarTail"
              v-slot="{ open }"
            >
              <DisclosureButton
                :class="[
                  menuStyle(item.current),
                  'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-m leading-6 font-semibold text-gray-500'
                ]"
              >
                <component
                  :is="item.icon"
                  class="h-6 w-6 shrink-0"
                  aria-hidden="true"
                />
                <div class="shrink-0">
                  {{ props.sidebarTail ? '' : item.name }}
                </div>
                <ChevronRightIcon
                  :class="[open ? 'rotate-90' : '', 'ml-auto h-5 w-5 shrink-0']"
                  aria-hidden="true"
                />
              </DisclosureButton>
              <DisclosurePanel as="ul" class="mt-1 px-2">
                <li v-for="subItem in item.children" :key="subItem.name">
                  <!-- 44px -->
                  <DisclosureButton
                    as="route-link"
                    @click="handleChangeNav(item.href)"
                    :href="subItem.href"
                    :class="[
                      menuStyle(subItem.current),
                      'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700'
                    ]"
                    >{{ subItem.name }}</DisclosureButton
                  >
                </li>
              </DisclosurePanel>
            </Disclosure>
            <Menu
              v-else
              as="div"
              class="relative inline-block text-left w-full"
            >
              <!-- 按钮-->
              <MenuButton
                :class="[menuStyle(item.current)]"
                class="w-full p-0 bg-white rounded p-2"
                ><component
                  :is="item.icon"
                  class="h-6 w-6 shrink-0"
                  aria-hidden="true"
                />
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
                  class="mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none px-5 py-3"
                >
                  <router-link
                    v-for="citem in item.children"
                    :key="citem.name"
                    :to="citem.href"
                    :class="[
                      menuStyle(item.current),
                      'group flex gap-x-3 rounded-md p-2 text-m leading-6 '
                    ]"
                    @click="handleChangeNav(item.href)"
                  >
                    {{ citem.name }}
                  </router-link>
                </MenuItems>
              </transition>
            </Menu>
          </li>
        </ul>
      </li>
      <li class="mt-auto">
        <router-link
          v-for="item in props.bottomNavigation"
          :key="item.name"
          :to="item.href"
          :class="[
            menuStyle(false),
            'group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
          ]"
          @click="handleChangeNav(item.href)"
        >
          <component
            :is="item.icon"
            :class="['h-6 w-6 shrink-0']"
            aria-hidden="true"
          />
          <div class="shrink-0">{{ props.sidebarTail ? '' : item.name }}</div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
const props = defineProps({
  navigation: {
    type: Array,
    required: true
  },
  bottomNavigation: {
    type: Array,
    required: true
  },
  sidebarTail: {
    type: Boolean,
    required: true
  },
  normalStyle: {
    type: String,
    default: 'bg-gray-100 text-indigo-600'
  },
  hoverStyle: {
    type: String,
    default: 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
  }
})
const menuStyle = (cur) => (cur ? props.normalStyle : props.hoverStyle)
const emit = defineEmits(['changeNav'])
function handleChangeNav(href) {
  emit('changeNav', href)
}
</script>

<style lang="scss" scoped></style>
