<template>
  <v-container fluid class="fill-height">
    <v-tabs v-model="tab" grow color="primary">
      <template v-for="t in types">
        <v-tab :key="t.id">{{ t.name }}</v-tab>
      </template>
      <v-btn @click="editType" color="secondary">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-tabs>
    <v-row>
      <v-col cols="8">{{types[tab]}}</v-col>
      <v-col class="text-center" cols="4" sm="4">
        <v-row align="end" justify="end">
          <div class="my-2">
            <v-btn x-large color="primary" dark @click="dialog= true">
              添加
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn
              x-large
              color="error"
              dark
              @click="confirmDialog= true"
              v-if="!desserts || !desserts.length"
            >删除当前资产类型</v-btn>
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
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            还没有添加{{types[tab].name}}，
            <v-btn color="primary" @click="dialog=true">添加</v-btn>
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
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.id" label="资产编号"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.name" label="资产名称"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.remark" label="资产说明"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">取消</v-btn>
            <v-btn color="blue darken-1" text @click="save">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="typeDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="editedType.id" label="资产类型编号"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedType.name" label="资产类型名称"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="typeDialog = false">取消</v-btn>
            <v-btn color="blue darken-1" text @click="addTabs">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="confirmDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">确认</v-card-title>

          <v-card-text>
            确认删除
            <b>{{types[tab].name}}</b>吗？
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="confirmDialog = false">取消</v-btn>

            <v-btn color="error" text @click="rmCurTabs">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    types: [{ id: 'pc', name: '电脑' }, { id: 'phone', name: '手机' }, { id: 'ipad', name: 'ipad' }],
    editedType: {},
    editedIndex: -1,
    tab: 0,
    formTitle: '添加',
    typeDialog: false,
    confirmDialog: false,
    dialog: false,
    singleSelect: false,
    selected: [],
    table: {},
    editedItem: {},
    resources: {
      pc: {
        headers: [
          {
            text: '资产编号',
            align: 'start',
            sortable: false,
            value: 'id'
          },
          { text: '资产名称', value: 'name' },
          { text: '资产说明', value: 'remark' },
          { text: '操作', value: 'actions' }
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            id: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            remark: '1%'
          },
          {
            name: 'Ice cream sandwich',
            id: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            remark: '1%'
          },
          {
            name: 'Eclair',
            id: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            remark: '7%'
          },
          {
            name: 'Cupcake',
            id: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            remark: '8%'
          },
          {
            name: 'Gingerbread',
            id: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            remark: '16%'
          },
          {
            name: 'Jelly bean',
            id: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            remark: '0%'
          },
          {
            name: 'Lollipop',
            id: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            remark: '2%'
          },
          {
            name: 'Honeycomb',
            id: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            remark: '45%'
          },
          {
            name: 'Donut',
            id: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            remark: '22%'
          },
          {
            name: 'KitKat',
            id: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            remark: '6%'
          }
        ]

      }
    }
  }),
  computed: {
    headers () {
      let curType = this.types[this.tab]
      return curType && this.resources[curType.id] && this.resources[curType.id].headers
    },
    desserts () {
      let curType = this.types[this.tab]
      return curType && this.resources[curType.id] && this.resources[curType.id].desserts
    }
  },
  methods: {
    addTabs () {
      this.types.push(this.editedType)
      this.typeDialog = false
    },
    rmCurTabs () {
      this.confirmDialog = false
      this.types.splice(this.tab--, 1)
    },
    editType () {
      this.editedType = { id: 't-' + this.types.length, name: 'tab' + this.types.length }
      this.typeDialog = true
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.desserts().indexOf(item)
      confirm('确定删除' + item.id + '?') && this.desserts().splice(index, 1)
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts()[this.editedIndex], this.editedItem)
      } else {
        this.desserts().push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
