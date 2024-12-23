import {StyleSheet} from 'react-native';

import {Colors} from 'shared/libs/helpers/colors';

export const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    backgroundColor: Colors.White100,
  },
  landscape: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 0,
  },
  smallHeader: {
    maxWidth: '50%',
    paddingHorizontal: 20,
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  containerLandscape: {
    flex: 1,
  },
  menuLandscape: {
    backgroundColor: Colors.White100,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray400,
  },
  menuItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: Colors.Black100,
  },
});
