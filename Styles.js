import { AuthErrorCodes } from 'firebase/auth';
import { StyleSheet } from 'react-native'; 

export default StyleSheet.create({

  /* yleiset tyylimääritykset */

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f5f4',
      },
      flatList: {
        padding: 20,
      },

      /* Home-sivun tyylimäärittelyt */
      header: {
        fontSize: 46,
        color: '#05968f',
        fontWeight: 'bold',
        marginBottom: 20,
      },
      letter: {
        fontSize: 350,
        color: '#05968f',
        fontWeight: 'bold',
        marginBottom: -80,
      },

      /* Museoiden listaus */
      emptyList: {
        marginVertical: 50,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
      },
      searchbar: {
        borderColor: '#c4c4c4',
        borderWidth: 1,
        margin: 20,
        marginTop: 20,
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#fafafa',
        width: '90%'
      },
      listImage:{
        width: '100%',
        height: 170,
      },
      item: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 20,
        marginBottom: 0,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#05968f',
      },
      city: {
        marginTop: 10,
        marginLeft: 40,
        marginRight: 20,
        fontSize: 10,
        fontWeight: 'normal',
        color: 'grey',
        textTransform: 'uppercase',
      },
      box: {
        marginTop: 10,
        marginBottom: 0,
        margin: 'auto',
        padding: 0,
        paddingBottom: 30,
        backgroundColor: '#fff',
        borderColor: '#99a8a6',
        borderWidth: 3,
        width: '100%',
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
      },

      /* Museon yksilöity sivu */
      mapStyle: {
        width: '100%',
        marginTop: 0,
        height: 280,
        border: 0,
        borderColor: '#05968f',
        position: 'absolute',
        top:0,
      },
      title: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 7,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#05968f',
      },
      location: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 20,
        fontSize: 15,
        fontWeight: 'normal',
        color: 'grey',
        textTransform: 'uppercase',
      },
      hours: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 20,
        fontSize: 20,
        fontWeight: 'normal',
        color: 'black',
      },
      info: {
        marginTop: 280,
        marginBottom: 10,
        padding: 20,
        paddingBottom: 30,
        backgroundColor:'#fff',
        borderColor: '#99a8a6',
        borderWidth: 3,
        width: '100%',
        position: 'absolute',
        top: 0,
      },

      /* Buttonit */ 
      visitedButton: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'transparent',
        alignSelf: 'flex-end',
      },
      toVisitButton: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'transparent',
        alignSelf: 'flex-end',
        marginLeft: 185,
      },
      removeButton: {
        marginLeft: 10,
      },
        centeringButton: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      outlinedButton: {
        borderColor: '#99a8a6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
      },
      outlinedButtonText: {
        color: '#05968f',
        fontSize: 16,
        textAlign: 'center',
      },

      /* kartta-sivun tyylit */
      map: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
      },

      /* profiilin tyylit */

      profileName:{
        marginTop: 10,
        marginBottom: 30,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#05968f',
        textAlign: 'center',
      },

      scrollTopButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        fontSize: 50,
        color: '#05968f'
      },
    });