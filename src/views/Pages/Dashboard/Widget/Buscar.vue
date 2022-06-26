<template>
  <div class="bg-secondary">
    <b-card-body class="bg-secondary justify-content-center">
      <base-input label="Imóveis" class="mr-2">
        <el-select v-model="itemCat" filterable placeholder="Selecione um tipo">
          <el-option
            v-for="option in imoveis"
            :key="option.id"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </base-input>
      <base-input label="Veículos" class="mr-2">
        <el-select v-model="itemCat" filterable placeholder="Selecione um tipo">
          <el-option
            v-for="option in veiculos"
            :key="option.id"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </base-input>

      <base-input label="Outros" class="mr-2">
        <el-select v-model="itemCat" filterable placeholder="Selecione um tipo">
          <el-option
            v-for="option in outros"
            :key="option.id"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </base-input>

      <b-button
        v-if="itemCat"
        variant="danger"
        class=""
        block
        @click="subCategoria"
        ><i class="ni ni-zoom-split-in"></i> Filtrar por {{ itemCat }}
      </b-button>
    </b-card-body>
  </div>
</template>
<script>
import { Select, Option } from "element-ui";
export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      imoveis: [
        { id: 1, value: "CASAS" },
        { id: 7, value: "APARTAMENTOS" },
        { id: 2, value: "TERRENOS" },
        { id: 3, value: "GALPOES" },
        { id: 4, value: "COMERCIAL" },
        { id: 5, value: "IMOVEIS RURAIS" },
        { id: 6, value: "AERONAVES" },
      ],
      veiculos: [
        { id: 1, value: "CARROS" },
        { id: 2, value: "CAMINHOES" },
        { id: 3, value: "MOTOS" },
        { id: 4, value: "ONIBUS" },
        { id: 5, value: "COMERCIAL" },
      ],
      outros: [
        { id: 1, value: "ELETRO/ELETRONICO" },
        { id: 2, value: "MOVEIS" },
        { id: 3, value: "BENS INDUSTRIAIS" },
        { id: 4, value: "ANIMAIS" },
        { id: 5, value: "PRODUTOS DIVERSOS" },
        { id: 6, value: "RECEITA FEDERAL" },
      ],
      itemCat: "",
    };
  },
  mounted() {
    if (localStorage.SubCat) this.palavraChave = localStorage.SubCat;
  },
  methods: {
    subCategoria() {
      const itemCat = localStorage.getItem("itemCat");
      localStorage.SubCat = this.itemCat;
      document.location.reload(true);
    },
  },
};
</script>
