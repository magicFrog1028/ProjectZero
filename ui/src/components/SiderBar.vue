<template>
  <div
    :class="[
      'fixed inset-y-0 flex flex-col duration-300 overflow-x-visible',
      sidebarTail ? 'w-20' : 'w-72',
      'border-gray-200 bg-white pb-4 border-r z-30'
    ]"
  >
    <!-- 公司LOGO-->
    <div class="flex flex-row items-center pl-5 h-16">
      <div class="basis-3/4 flex-none">
        <img class="h-8" :src="logo" alt="Your Company" />
      </div>
      <div>
        <button
          type="button"
          :class="[sidebarTail ? '-translate-x-1' : 'translate-x-11']"
          class="p-2 text-gray-700 bg-white rounded-full border-2 translate-y-8"
          @click="sidebarTail = !sidebarTail"
        >
          <ChevronRightIcon
            :class="[
              sidebarTail ? ' text-gray-500' : 'rotate-180 text-gray-400',
              'h-6 w-6'
            ]"
            aria-hidden="true"
          />
        </button>
      </div>

      <!--Siderbar open/off Button-->
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
    <!-- 侧边栏导航切换菜单-->
    <nav class="flex flex-1 flex-col px-5">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="space-y-1">
            <li v-for="item in navigation" :key="item.name">
              <a
                v-if="!item.children"
                :href="item.href"
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
                <div class="shrink-0">{{ sidebarTail ? '' : item.name }}</div>
              </a>
              <Disclosure as="div" v-else-if="!sidebarTail" v-slot="{ open }">
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
                    {{ sidebarTail ? '' : item.name }}
                  </div>
                  <ChevronRightIcon
                    :class="[
                      open ? 'rotate-90' : '',
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
                    <a
                      v-for="citem in item.children"
                      :key="citem.name"
                      :href="citem.href"
                      :class="[
                        menuStyle(item.current),
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
            :class="[
              menuStyle(false),
              'group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
            ]"
          >
            <Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
            <div class="shrink-0">{{ sidebarTail ? '' : '设置' }}</div>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const logo = 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
const otherBrands = []
</script>

<style lang="scss" scoped></style>
