var app = new Vue({
  el: "#app",
  data: {
    title: "",
    lottoResult: "",
    datetime: ""
  },
  created() {
    this.setTitle();
    this.getLottoResultList();
  },
  methods: {
    setTitle: function () {
      var d = new Date();
      this.title =
        "ผลหวยประจำวันที่ " +
        this.addZero(d.getDate()) +
        "-" +
        this.addZero((d.getMonth() + 1)) +
        "-" +
        d.getFullYear();
    },
    getLottoResultList: function () {
      var d = new Date();
      axios
        .get(
          "https://api.gmlotto.com/info/getResult/" +
            d.getFullYear() +
            this.addZero((d.getMonth() + 1)) +
            this.addZero(d.getDate())
        )
        .then((res) => (app.lottoResult = res.data.info));
      this.datetime = new Date();
      setTimeout(this.getLottoResultList, 300000);
    },
    addZero: function(num) {
      return (num >= 0 && num < 10) ? "0" + num : num + "";
  }
  },
  ready(){
    this.getLottoResultList();
  }
});
