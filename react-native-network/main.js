class RemotePhotos extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([{title: 'Waiting for data to load...'}])
    };    
  
      this.getDataFromApiAsync();
  }
  
  getDataFromApiAsync() {
    fetch('http://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((responseJson) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
          dataSource: ds.cloneWithRows(responseJson)
        };            
      })
      .then((newState) => this.setState(newState))
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.title}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    margin: 15,
  },
});

registerComponent(RemotePhotos);