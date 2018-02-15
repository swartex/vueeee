<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <table class="table table-bordered table-hover table-striped table-xs-block">
            <tr>
              <td colspan="4">
                <input type="text"class="form-control" placeholder="live search(id, name, location, currency)" autofocus v-model="search">
              </td>
            </tr>
            <thead class="bg-primary">
              <tr>
                <th v-on:click="sortById = !sortById">ID</th>
                <th v-on:click="sortByName = !sortByName">Name</th>
                <th v-on:click="sortByLocation = !sortByLocation">Location</th>
                <th v-on:click="sortByCurrency = !sortByCurrency">Currency</th>
              </tr>
            </thead>
            <tr v-for="item in liveSearch ">
              <td v-text="item.id"></td>
              <td v-text="item.name"></td>
              <td v-text="item.location"></td>
              <td v-text="item.currency"></td>
            </tr>
            <tr>
              <td colspan="4" style="float: right">
                <b style="float: right">Итого - {{total}} у.е.</b>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import test from '../static/test.json'
  export default {
    name: "list",
    data() {
      return {
        data: test,
        search: '',
        sortedBy: ''
      }
    },
    computed: {
      total: function () {
        return this.liveSearch.reduce(function (sum, next) {
          return sum + next.currency;
        }, 0);
      },

      liveSearch: function () {
        return this.data.filter((item) => {
          return item.name.match(this.search) ||
            item.id.match(this.search) ||
            item.location.match(this.search) ||
            item.currency.toString().match(this.search.toString())
        })
      },
      sortById: function (val) {
        let self = this;
        self.data = self.sortBy(self.data, 'id', val);
      },
      sortByName: function (val) {
        let self = this;
        self.data = self.sortBy(self.data, 'name', val);
      },
      sortByLocation: function (val) {
        let self = this;
        self.data = self.sortBy(self.data, 'location', val);
      },
      sortByCurrency: function (val) {
        let self = this;
        self.data = self.sortBy(self.data, 'currency', val);
      },
    },
    methods: {
      sortBy: function(array, param, reverse) {
        let filterA, filterB;
        return array.sort(function (a, b) {
          switch (param) {
            case 'id':
              filterA = a.id;
              filterB = b.id;
              break;
            case 'name':
              filterA = a.name;
              filterB = b.name;
              break;
            case 'location':
              filterA = a.location;
              filterB = b.location;
              break;
            case 'currency':
              filterA = Number(a.currency);
              filterB = Number(b.currency);
              break;
          }
          if (reverse) {
            return (filterA > filterB) ? 1 : -1;
          } else {
            return (filterA < filterB) ? 1 : -1;
          }
        });
      },
    }
  }


</script>

<style scoped>
  input{
    width: 100%;
  }
  table thead{
    color: #fff;
  }
</style>
