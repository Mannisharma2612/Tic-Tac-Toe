import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
import { render } from 'react-dom';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount()
  {
    this.initializeGame();
  }
  initializeGame = () => {
    this.setState({gameState:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    });
  } 
  // logic if sum of rows, diagonals, cols ==3 then player 1 has won
  // logic if sum of rows, diagonals, cols ==-3 then player 2 has won 
  // returns 1 if player2 won and -1 if player 2 won, 0 if draw ...
  getWinner = () => {
    const tileSize = 3;
    var arr = this.state.gameState;
    var sum;

    // sum of rows 
    for(var i=0; i<tileSize; i++)
    {
      sum = arr[i][0]+arr[i][1]+arr[i][2];
      if (sum==3){return 1;}
      else if (sum==-3){return -1;}
    }
    // sum of col
    for(var i=0; i<tileSize; i++)
    {
      sum = arr[0][i]+arr[1][i]+arr[2][i];
      if (sum==3){return 1;}
      else if (sum==-3){return -1;}
    }
    //diagonals
    sum = arr[0][0]+arr[1][1]+arr[2][2];
    if (sum==3){return 1;}
    else if (sum==-3){return -1;}

    sum = arr[0][2]+arr[1][1]+arr[2][0];
    if (sum==3){return 1;}
    else if (sum==-3){return -1;}

    // no winner..
    return 0;
  }
  onTilePress = (row, col) => {

    // dont allow same tile to be pressed again.. 
    var value  = this.state.gameState[row][col];
    if (value!== 0) {return; } 


    var currentPlayer = this.state.currentPlayer;

    // correct tile...
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    // switch the players..
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    // check for winners...
    var winner = this.getWinner();
    if(winner==1) {
      Alert.alert("Player 1 has won !!");
      this.initializeGame();
    } else if(winner==-1){
      Alert.alert("Player 2 has won !!");
      this.initializeGame();
    }
  }
  onNewGamePress = () =>{
    this.initializeGame();
  }
  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1 : return <Icon name="close" style={styles.tileX } />;
      case -1 : return <Icon name="circle-outline" style={styles.tileO } />;
      default: return <TouchableOpacity/>
    }
  }




  render()
  {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0) } style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            { this.renderIcon(0, 0) }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1) } style={[styles.tile, { borderTopWidth: 0 }]}>
            { this.renderIcon(0, 1) }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2) } style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0}]}>
            { this.renderIcon(0, 2) }
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0) } style={[styles.tile, { borderLeftWidth: 0 }]}>
            { this.renderIcon(1, 0) }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1) } style={[styles.tile, {}]}>
            { this.renderIcon(1, 1) }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2) } style={[styles.tile, { borderRightWidth: 0 }]}>
            { this.renderIcon(1, 2) }
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0) } style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            { this.renderIcon(2, 0) }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1) } style={[styles.tile, { borderBottomWidth: 0 }]}>
            { this.renderIcon(2, 1) }
            </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2) } style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
            { this.renderIcon(2, 2) }
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={{ paddingTop: 50 }}/>
        <Button title="New Game" onPress={this.onNewGamePress} />

      </View>
    );
  }
}
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile:{
    borderWidth: 10,
    width: 100,
    height: 100,
  },
  tileX:{
    color: 'red',
    fontSize: 60,
  },

  tileO:{
    color: 'green',
    fontSize: 60,
  }
 });