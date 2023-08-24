<template>
  <div>
    <!-- 侧边栏 -->
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
          <img
            class="h-8"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
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
      <BrandSwitcher
        :curChoice="brandStore.curBrand"
        :otherChoices="brandStore.otherBrands"
        :operations="brandOperations"
        :sidebarTail="sidebarTail"
        @changeBrand="handleChangeBrand"
      ></BrandSwitcher>
      <hr class="border-slate-300 border-t-1 rounded pb-4" />

      <!-- 侧边栏导航切换菜单-->
      <CollapsibleMenu
        :navigation="navigation"
        :sidebarTail="sidebarTail"
        :bottomNavigation="bottomNavigation"
        @changeNav="handleChangeNav"
      ></CollapsibleMenu>
    </div>

    <div :class="[sidebarTail ? 'pl-20' : 'pl-72', 'duration-300 z-20']">
      <!--上导航栏-->
      <div
        class="sticky top-0 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm"
      >
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
import CollapsibleMenu from '@/components/CollapsibleMenu.vue'
import BrandSwitcher from '@/components/BrandSwitcher.vue'
import {
  ChevronRightIcon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
const route = useRoute()
const sidebarTail = ref(false)
// const menuStyle = (cur) =>
//   cur
//     ? 'bg-gray-100 text-indigo-600'
//     : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
const bottomNavigation = [
  { name: '帮助', href: '#', icon: HomeIcon },
  { name: '设置', href: '#', icon: HomeIcon }
]
const navigation = ref([
  { name: '起始页', href: '/app/dashboard', icon: HomeIcon },
  {
    name: '产品目录',
    href: '/app/proCatalog',
    icon: CalendarIcon
  },
  {
    name: '我的订单',
    href: '/app/orderList',
    icon: DocumentDuplicateIcon
  },
  {
    name: '我的产品',
    href: '/app/tempList',
    icon: ChartPieIcon
  },
  { name: 'AI智绘', href: '#', icon: ChartPieIcon },
  {
    name: '钱相关',
    icon: UsersIcon,
    children: [
      { name: '付款方式', href: '#' },
      { name: '法律信息', href: '#' }
    ]
  },
  {
    name: '资源库',
    icon: FolderIcon,
    children: [
      { name: '我的图库', href: '#' },
      { name: 'AI广场', href: '#' },
      { name: 'AI智绘', href: '#' }
    ]
  },
  {
    name: '店铺管理',
    icon: FolderIcon,
    children: [
      { name: '店铺信息', href: '#' },
      { name: '绑定店铺', href: '#' }
    ]
  }
])
function handleChangeNav(href) {
  navigation.value.map((item) => {
    if (
      item.href === href ||
      (item?.children &&
        item.children.find((i) => {
          if (i.href === route.href) {
            i.current = true
            return true
          }
        }))
    ) {
      item.current = true
      return
    }
    item.current = false
  })
}
handleChangeNav(route.fullPath)
const userNavigation = [
  { name: '你的资料', href: '#' },
  { name: '登出', href: '#' }
]

////brand
import { getBrands } from '@/api/auth.js'
import { useBrandStore } from '@/stores/brand'
const brandStore = useBrandStore()
const brandOperations = [
  { name: '添加新的品牌', href: '#', icon: HomeIcon },
  { name: '管理新的品牌', href: '#', icon: HomeIcon }
]
getBrands().then((res) => {
  brandStore.brandList = res
  brandStore.curBrand = res[0]
})
const handleChangeBrand = (brandId) => {
  brandStore.changeBrand(brandId)
}
</script>

<style lang="scss" scoped></style>
