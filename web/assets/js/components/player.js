var Player = React.createClass ({
  getInitialState: function() {
    return {
      playerId: 1,
      name: 'Everaldo',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg',
      cards: ['SA', 'SK'],
      handRank: '',
      rankBit: 0,
      showCards: false,
      winner: false
    }
  },
  componentDidMount: function () {
   $.ajax({
     url: '/player',
     dataType: 'json',
     cache: false,
     success: function (data) {
        this.setState({name: data.name, avatar: data.avatar})
     }.bind(this),
     error: function (xhr, status, err) {
        console.error(err.toString())
     }
   })
   var playerId = parseInt(this.props.player)
   this.setState({playerId})
   //this.setState({cards: dealtCards.hands[playerId - 1]})
   components.push(this)
  },
  deal: function (cards) {
    this.setState({cards})
  },
  reveal: function (hand, winningBit) {
    console.log(hand)
    this.setState({showCards: true})
    this.setState({handRank: hand.rankName, rankBit: hand.rankBit})
    if(this.state.rankBit == winningBit) {
      this.setState({winner: true})
    }
  },
  render: function () {
    return (
          <div className="player">
            <div className="header">
              <div className="avatar">
                <img src={this.state.avatar}/>
              </div>
              <div className="name">
                {this.state.name}
              </div>
              {
              this.state.winner
              ?
                <div className="winner">
                  <img src="/img/crown.png"/>
                </div>
              : <div></div>
              }
            </div>
            <div className="hand">
              {
                this.state.showCards
                ? 
                  <span><img src={"/img/deck/" + this.state.cards[0] + ".png"}/>
                  <img src={"/img/deck/" + this.state.cards[1] + ".png"}/></span>
                :
                  <span><img src={"/img/deck/back.png"}/>
                  <img src={"/img/deck/back.png"}/></span>
              }
            </div>
            <div className="rank">
              {this.state.handRank}
            </div>
          </div>
    )
  }
})



ReactDOM.render(<Player player="1"/>, document.querySelector('#player1'))
ReactDOM.render(<Player player="2"/>, document.querySelector('#player2'))
ReactDOM.render(<Player player="3"/>, document.querySelector('#player3'))
ReactDOM.render(<Player player="4"/>, document.querySelector('#player4'))
ReactDOM.render(<Player player="5"/>, document.querySelector('#player5'))

function reveal () {
  components.map(function(c) {
    c.reveal()
  }) 
}
