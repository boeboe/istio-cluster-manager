<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Cluster Manager
          </v-list-item-title>
          <v-list-item-subtitle>
            Demo
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-treeview
        v-model="tree"
        :open="initiallyOpen"
        :items="items"
        activatable
        item-key="name"
        open-on-click
        >
        <template slot="label" slot-scope="props">
          <v-icon>{{ props.item.icon }}</v-icon>
          <router-link v-if="props.item.to" :to="props.item.to" custom v-slot="{ navigate }">
            <span @click="navigate" @keypress.enter="navigate" role="link">{{ props.item.name }}</span>
          </router-link>
          <span v-else>{{ props.item.name }}</span>
        </template>
      </v-treeview>
    </v-navigation-drawer>
    <v-app-bar app>
      <!-- -->
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    initiallyOpen: [''],
    items: [
      {
        name: 'Discover',
        icon: 'mdi-binoculars',
        children: [
          {
            name: 'Clusters',
            to: '/discover/clusters',
            icon: 'mdi-magnify'
          },
          {
            name: 'Meshes',
            to: '/discover/meshes',
            icon: 'mdi-magnify'
          }
        ]
      },
      {
        name: 'Applications',
        to: '/applications',
        icon: 'mdi-apps'
      },
      {
        name: 'Integrations',
        to: '/integrations',
        icon: 'mdi-tools'
      },
      {
        name: 'Settings',
        to: '/settings',
        icon: 'mdi-cog'
      }
    ],
    tree: []
  })
}
</script>
