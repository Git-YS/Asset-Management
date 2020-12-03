<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>首页</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/manage">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>资产管理</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/register">
          <v-list-item-action>
            <v-icon>mdi-send</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>资产登记</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/record">
          <v-list-item-action>
            <v-icon>mdi-folder-open</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>登记记录</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{$route.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$vuetify.theme.dark=!$vuetify.theme.dark"><v-icon>mdi-brightness-{{$vuetify.theme.dark? 4 : 7}}</v-icon></v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <!-- <v-breadcrumbs
          :items="[{
          text: $route.name,
          disabled: false,
          href: 'breadcrumbs_dashboard',
        }]"
        >
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>-->
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app dark color="primary">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import colors from 'vuetify/lib/util/colors'
export default {
  data: () => ({
    showMessages: null,
    drawer: null,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.indigo.base,
          secondary: colors.pink.base
        },
        dark: {
          primary: colors.pink.base,
          secondary: colors.pink.base

        }
      }
    }
  })
}
</script>
