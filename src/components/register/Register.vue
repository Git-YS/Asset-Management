<template>
  <v-container>
    <form>
      <v-combobox v-model="registerForm.dept" :items="init.dept" label="所属部门"></v-combobox>
      <!-- <v-text-field v-model="registerForm.dept" :error-messages="nameErrors" :counter="10" label="所属部门" required></v-text-field> -->
      <v-text-field
        v-model="registerForm.name"
        :error-messages="nameErrors"
        :counter="10"
        label="姓名"
        required
      ></v-text-field>
      <template>
        <v-list two-line>
          <v-subheader>
            资产列表
            <v-btn depressed outlined color="indigo" @click="addResource()">
              添加
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-subheader>
          <template v-for="(item, index) in resources">
            <v-list-item :key="index">
              <!-- <v-list-item-avatar>
              <v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon>
              </v-list-item-avatar>-->

              <v-list-item-content>
                <v-list-item-title v-text="index"></v-list-item-title>
                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                <v-combobox v-model="item.type" :items="init.type" label="资产类型"></v-combobox>
                <!-- <v-text-field v-model="registerForm.type" :error-messages="emailErrors" label="资产类型" required></v-text-field> -->
                <v-text-field v-model="item.id" :error-messages="emailErrors" label="资产编号" required></v-text-field>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon v-if="index>0"  @click="delResource(index)">
                  <v-icon color="grey lighten-1">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="'div-'+index"></v-divider>
          </template>
        </v-list>
      </template>

      <v-btn color="primary" class="mr-4" @click.stop="dialog = true">登记</v-btn>
      <v-btn @click="clear">重置</v-btn>
    </form>
    <template>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">登记信息确认</v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="4">所属部门</v-col>
              <v-col cols="8">{{ registerForm.dept }}</v-col>
              <v-col cols="4">姓名</v-col>
              <v-col cols="8">{{ registerForm.name }}</v-col>
              <v-col cols="12">
                <v-list>
                  <template v-for="(item, index) in resources">
                    <v-list-item :key="index">
                      <v-list-item-content>
                        <v-list-item-title v-text="item.name" />
                        <v-list-item-subtitle v-text="item.id" />
                        {{ item.type }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="index" v-if="index !== resources.length"></v-divider>
                  </template>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'Register',
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked: val => {
        return val
      }
    }
  },

  data: () => ({
    resources: [{}],
    init: {
      dept: ['人力行政部', '财务部'],
      type: ['电脑', '手机号']
    },
    registerForm: {
      name: '',
      email: '',
      checkbox: false,
      select: null,
      dept:'123'
    },
    resourceName: '',
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    dialog: false
  }),

  computed: {
    checkboxErrors: () => {
      const errors = []
      if (!this.$v || !this.$v.checkbox || !this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors: () => {
      const errors = []
      if (!this.$v || !this.$v.select || !this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nameErrors: () => {
      const errors = []
      if (!this.$v || !this.$v.name || !this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors: () => {
      const errors = []
      if (!this.$v || !this.$v.email || !this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },

  methods: {
    submi: () => {
      this.dialog = true
    },
    clear: () => {
      this.$v.$reset()
      // this.name = ''
      // this.email = ''
      this.resources = []
    },
    addResource () {
      this.resources.push({
        icon: 'f',
        iconClass: 'grey lighten-1 white--text',
        name: '',
        type: '',
        id: ''
      })
    },
    delResource (_index) {
      this.resources.splice(_index, 1)
    }
  }
}
</script>
