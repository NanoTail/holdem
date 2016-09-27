var components = []
var dealtCards
var Dealer = React.createClass ({
  getInitialState: function () {
    return {
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg',
      cards: ['SQ', 'SJ', 'ST'],
      showCards: false,
      processedHands: []
    }
  },
  componentDidMount: function () {
   $.ajax({
     url: '/deal',
     dataType: 'json',
     cache: false,
     success: function (data) {
       dealtCards = data
       this.setState({cards: dealtCards.communityCards})
       var index = 0;
       components.map(function(c) {
          c.deal(dealtCards.hands[index++])
       })
     }.bind(this),
     error: function (xhr, status, err) {
        console.error(err.toString())
     }
   })
  },
  reveal: function () {
    this.setState({showCards: true})
    var hands = []
    var index = 0;
    $.ajax({
      url: '/rank',
      type: 'post',
      dataType: 'json',
      data: dealtCards,
      success: function (data) {
        this.setState({processedHands: data})
        //var sort the hands to find highest
        var sorted = data.slice(0,5)
        var sorted = sorted.sort(function (a,b) {
          var rankCompare = a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : b.rank - a.rank
          if (rankCompare != 0) {
            return rankCompare
          } else {
            return (a.rankBit < b.rankBit) ? 1 : (a.rankBit > b.rankBit) ? -1 : (b.rankBit - a.rankBit)
          }
        })
        console.log(sorted)
        var index = 0;
        components.map(function(c) {
          c.reveal(data[index++], sorted[0].rankBit)
        })
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(err.toString())
      }
    })
  },
  render: function () {
    return (
          <div className="player">
            <div className="header">
              <div className="avatar">
                <img src={this.state.avatar}/>
              </div>
              <div className="name">
                Dealer
              </div>
            </div>
            <div className="hand">
              {
                this.state.showCards
                ? 
                  <span>
                  <img src={"/img/deck/" + this.state.cards[0] + ".png"}/>
                  <img src={"/img/deck/" + this.state.cards[1] + ".png"}/>
                  <img src={"/img/deck/" + this.state.cards[2] + ".png"}/></span>
                :
                  <span><img src={"/img/deck/back.png"}/>
                  <img src={"/img/deck/back.png"}/>
                  <img src={"/img/deck/back.png"}/></span>
              }
            </div>
            <div className="rank">
              <button onClick={this.reveal}>Reveal</button>
            </div>
          </div>
    )
  }
})

ReactDOM.render(<Dealer />, document.querySelector('#dealer'))
