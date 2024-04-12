import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1},
  txt: {fontSize: 30, fontWeight: '600'},
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },
  title: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  subTitle: {
    color: '#999999',
    fontSize: 20,
    margin: 5,
  },
  color : {
    width: 20,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  }
});

export default styles;
