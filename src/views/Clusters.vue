<template>
  <v-data-table :headers="headers" :items="clusters" sort-by="name" class="elevation-1" show-select>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Clusters</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> Add Cluster </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedCluster.name" label="ClusterName"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedCluster.major" label="MajorVersion"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedCluster.minor" label="MinorVersion"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedCluster.openshiftVersion" label="OpenshiftVersion"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="saveCluster"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteClusterConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.name="{ item }">
      <span v-if="item.openshiftVersion === ''" ><v-icon small class="mr-2" color="blue"> mdi-kubernetes </v-icon>{{item.name}}</span>
      <span v-if="item.openshiftVersion !== ''" ><v-icon small class="mr-2" color="red"> mdi-redhat </v-icon>{{item.name}}</span>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editCluster(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteCluster(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data> No clusters registered </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      { text: 'Cluster Name', value: 'name', sortable: true, align: 'start' },
      { text: 'MajorVersion', value: 'major', sortable: false },
      { text: 'MinorVersion', value: 'minor', sortable: false },
      { text: 'OpenshiftVersion', value: 'openshiftVersion', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedCluster: {
      name: '',
      major: '',
      minor: '',
      openshiftVersion: ''
    },
    defaultCluster: {
      name: '',
      major: '',
      minor: '',
      openshiftVersion: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Cluster' : 'Edit Cluster'
    },
    clusters () {
      return this.$store.state.clusters
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.$store.dispatch('getClusters')
  },

  methods: {

    editCluster (item) {
      this.editedIndex = item.id
      this.editedCluster = Object.assign({}, item)
      this.dialog = true
    },

    deleteCluster (item) {
      this.editedIndex = item.id
      this.editedCluster = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteClusterConfirm () {
      this.$store.dispatch('deleteCluster', this.editedCluster.id)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedCluster = Object.assign({}, this.defaultCluster)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedCluster = Object.assign({}, this.defaultCluster)
        this.editedIndex = -1
      })
    },

    saveCluster () {
      if (this.editedIndex > -1) {
        this.$store.dispatch('updateCluster', [this.editedIndex, this.editedCluster])
      } else {
        this.$store.dispatch('createCluster', this.editedCluster)
      }
      this.close()
    }
  }
}
</script>
