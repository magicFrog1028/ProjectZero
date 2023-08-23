<template>
  <div>
    <!-- Static sidebar for desktop -->
    <div
      :class="[
        'fixed inset-y-0 flex flex-col duration-300 overflow-x-visible',
        sidebarTail ? 'w-20' : 'w-72',
        'border-gray-200 bg-white pb-4 border-r '
      ]"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <!-- Sidebar LOGO-->
      <div class="flex items-center px-5 h-16">
        <img
          class="h-8"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>
      <!-- Sidebar Brand Switcher-->
      <hr class="border-slate-300 border-t-2 rounded" />
      <Menu as="div" class="w-full h-20" v-slot="{ open }">
        <MenuButton
          class="h-full w-full bg-gray-100 rounded text-gray-900 px-5 hover:bg-gray-200"
        >
          <div class="flex flex-row items-center">
            <img
              class="flex-none h-9 w-9 rounded-full"
              :src="curBrand.logo"
              alt=""
            />
            <div :class="[sidebarTail ? 'hidden' : '', 'grow shrink-0']">
              <p class="text-lg font-medium text-gray-700 font-semibold">
                {{ curBrand.name }}
              </p>
              <p class="text-xs font-medium text-gray-500">
                {{ curBrand.addInfo }}
              </p>
            </div>
            <ChevronDownIcon
              :class="[
                sidebarTail ? 'hidden' : '',
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
            :class="sidebarTail ? 'w-64' : 'w-full'"
            class="absolute mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none px-5 py-3"
          >
            <!-- 品牌按钮-->
            <MenuItem
              v-slot="{ active }"
              v-for="item in otherBrands"
              :key="item.name"
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
                    :src="item.logo"
                    :alt="item.name"
                  />
                  <div class="grow shrink-0 pl-5">
                    <p class="text-lg font-medium text-gray-700">
                      {{ item.name }}
                    </p>
                    <p class="text-xs font-medium text-gray-500">
                      {{ item.addInfo }}
                    </p>
                  </div>
                </div>
              </button>
            </MenuItem>
            <hr class="border-slate-300 border-t-1" />
            <!-- 添加品牌按钮-->
            <MenuItem v-slot="{ active }">
              <button
                @click="console.log('clock')"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  ' w-full px-0 mt-3 pl-1 text-left text-sm flex gap-x-3 '
                ]"
              >
                <Cog6ToothIcon
                  class="h-8 w-8 shrink-0 text-gray-400 roup-hover:text-indigo-600"
                  aria-hidden="true"
                />
                <p class="text-lg font-medium text-gray-500">添加新的品牌</p>
              </button>
            </MenuItem>
            <!-- 管理品牌按钮-->
            <MenuItem v-slot="{ active }">
              <button
                @click="console.log('clock')"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  ' w-full px-0 mt-3 pl-1 text-left text-sm flex gap-x-3 '
                ]"
              >
                <Cog6ToothIcon
                  class="h-8 w-8 shrink-0 text-gray-400 roup-hover:text-indigo-600"
                  aria-hidden="true"
                />
                <p class="text-lg font-medium text-gray-500">管理新的品牌</p>
              </button>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
      <hr class="border-slate-300 border-t-1 rounded pb-4" />
      <!-- Sidebar Brand menu-->
      <nav class="flex flex-1 flex-col px-5">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <a
                  v-if="!item.children"
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-50 text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                    'group flex gap-x-3 rounded-md p-2 text-m leading-6'
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.current
                        ? 'text-indigo-600'
                        : 'text-gray-400 group-hover:text-indigo-600',
                      'h-6 w-6 shrink-0'
                    ]"
                    aria-hidden="true"
                  />
                  <div class="shrink-0">{{ sidebarTail ? '' : item.name }}</div>
                </a>
                <Disclosure as="div" v-else-if="!sidebarTail" v-slot="{ open }">
                  <DisclosureButton
                    :class="[
                      item.current
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                      'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-m leading-6 font-semibold text-gray-700'
                    ]"
                  >
                    <component
                      :is="item.icon"
                      class="h-6 w-6 shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div class="shrink-0">
                      {{ sidebarTail ? '' : item.name }}
                    </div>
                    <ChevronRightIcon
                      :class="[
                        open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                        'ml-auto h-5 w-5 shrink-0'
                      ]"
                      aria-hidden="true"
                    />
                  </DisclosureButton>
                  <DisclosurePanel as="ul" class="mt-1 px-2">
                    <li v-for="subItem in item.children" :key="subItem.name">
                      <!-- 44px -->
                      <DisclosureButton
                        as="a"
                        :href="subItem.href"
                        :class="[
                          subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
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
                    class="w-full p-0 bg-white rounded text-gray-900 p-2 hover:bg-gray-200"
                    ><component
                      :is="item.icon"
                      :class="[
                        item.current
                          ? 'text-indigo-600'
                          : 'text-gray-400 group-hover:text-indigo-600',
                        'h-6 w-6 shrink-0'
                      ]"
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
                      <a
                        v-for="citem in item.children"
                        :key="citem.name"
                        :href="citem.href"
                        :class="[
                          item.current
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                          'group flex gap-x-3 rounded-md p-2 text-m leading-6 '
                        ]"
                      >
                        {{ citem.name }}
                      </a>
                    </MenuItems>
                  </transition>
                </Menu>
              </li>
            </ul>
          </li>
          <li class="mt-auto">
            <a
              href="#"
              class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
            >
              <Cog6ToothIcon
                class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                aria-hidden="true"
              />
              <div class="shrink-0">{{ sidebarTail ? '' : '设置' }}</div>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div :class="sidebarTail ? 'pl-20' : 'pl-72'" class="duration-300">
      <!--上导航栏-->
      <div
        class="sticky top-0 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm"
      >
        <!--Siderbar open/off Button-->
        <button
          type="button"
          class="-m-2.5 p-2 text-gray-700 -translate-x-7 translate-y-9 bg-white rounded-full border-2"
          @click="sidebarTail = !sidebarTail"
        >
          <span class="sr-only">Open sidebar</span>
          <ChevronRightIcon
            :class="[
              sidebarTail ? ' text-gray-500' : 'rotate-180 text-gray-400',
              'h-6 w-6'
            ]"
            aria-hidden="true"
          />
        </button>

        <!-- Separator -->
        <div class="h-6 w-px bg-gray-200" aria-hidden="true" />
        <!-- 搜索栏 -->
        <div class="flex flex-1 gap-x-4 self-stretch">
          <form class="relative flex flex-1" action="#" method="GET">
            <label for="search-field" class="sr-only">Search</label>
            <MagnifyingGlassIcon
              class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="search-field"
              class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Search..."
              type="search"
              name="search"
            />
          </form>
          <!-- 消息 -->
          <div class="flex items-center gap-x-4">
            <button
              type="button"
              class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Separator -->
            <div class="block h-6 w-px bg-gray-200" aria-hidden="true" />

            <!-- Profile dropdown -->
            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span class="flex items-center">
                  <span
                    class="ml-4 text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                    >Tom Cook</span
                  >
                  <ChevronDownIcon
                    class="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <a
                      :href="item.href"
                      :class="[
                        active ? 'bg-gray-50' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                      ]"
                      >{{ item.name }}</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <!-- 主要内容区 -->
      <main class="py-10 bg-slate-200">
        <div class="px-4">
          <!-- Your content -->
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  ChevronRightIcon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const sidebarTail = ref(false)
const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: '产品目录', href: '#', icon: CalendarIcon, current: false },
  { name: '我的订单', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: '我的产品', href: '#', icon: ChartPieIcon, current: false },
  { name: 'AI智绘', href: '#', icon: ChartPieIcon, current: false },
  {
    name: '钱相关',
    icon: UsersIcon,
    current: false,
    children: [
      { name: '付款方式', href: '#' },
      { name: '法律信息', href: '#' }
    ]
  },
  {
    name: '资源库',
    icon: FolderIcon,
    current: false,
    children: [
      { name: '我的图库', href: '#' },
      { name: 'AI广场', href: '#' },
      { name: 'AI智绘', href: '#' }
    ]
  },
  {
    name: '店铺管理',
    icon: FolderIcon,
    current: false,
    children: [
      { name: '店铺信息', href: '#' },
      { name: '绑定店铺', href: '#' }
    ]
  }
]
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' }
]
////brand

import { getBrands } from '@/api/auth.js'
const brandList = ref([])
const curBrand = ref({})
const otherBrands = computed(() => {
  return brandList.value.filter((e) => e.id !== curBrand.value.id)
})
onBeforeMount(() => {
  getBrands().then((res) => {
    brandList.value = res
    curBrand.value = res[0]
  })
})
const handleChangeBrand = (brandId) => {
  curBrand.value = brandList.value.find((e) => e.id === brandId)
  console.log(brandId)
}
// const handleMangBrand = (operation) => {
//   console.log(operation)
// }
// const brandOpera = [
//   { name: 'Dashboard', href: '#', icon: HomeIcon, current: true }
// ]
</script>

<style lang="scss" scoped></style>
