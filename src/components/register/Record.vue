<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center" cols="4" sm="4" offset="8">
        <v-row align="end" justify="end">
          <div class="my-2">
            <v-btn depressed x-large outlined color="primary" link to="/register">登记</v-btn>
          </div>
        </v-row>
      </v-col>
      <v-col offset="12">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="desserts"
          :single-select="singleSelect"
          item-key="name"
          show-select
          class="elevation-1"
        >
          <template v-slot:top>
            <v-data></v-data>
          </template>
<!-- v-slot:item.actions="{ item }" -->
          <template >
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <registerForm></registerForm>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">取消</v-btn>
            <v-btn color="blue darken-1" text @click="save">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import Vue from 'vue'
import registerDao from '@/dao/RegisterDao'
Vue.component('registerForm', '@/components/register/Register')
export default {
  data: () => ({
    singleSelect: false,
    selected: [],
    headers: [
      {
        text: '姓名',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: '所属部门', value: 'fat' },
      { text: '', value: 'calories' },
      { text: '资产说明', value: 'fat' },
      { text: '登记人', value: 'carbs' },
      { text: '登记部门', value: 'protein' },
      { text: '操作', value: 'actions' }
    ],
    dialog: false,
    formTitle: '登记'
  }),
  computed: {
    desserts () {
      return registerDao.findRegisterRecord()
    }
  },
  methods: {
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
