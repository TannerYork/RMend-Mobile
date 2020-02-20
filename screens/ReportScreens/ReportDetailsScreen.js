import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { updateDetails, resetReport } from '../../redux/actions';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';

class ReportDetailsScreen extends React.Component {
  render() {
    const {
      navigation: { navigate },
      details: { type, details, iconName },
      updateDetails,
      resetReport,
      isLoading
    } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
        <Header
          title="Details"
          {...this.props}
          navTitleOne="Home"
          navTitleTwo="Next"
          navActionOne={() => {
            resetReport();
            navigate('Home');
          }}
          navActionTwo={() => navigate('Send')}
        />
        <Text style={styles.header}>Incident Type</Text>
        <Text style={styles.subHeader}>Required</Text>
        {!type && (
          <TouchableOpacity
            style={styles.mainSelector}
            onPress={() => navigate('ReportTypeGroups')}
          >
            <Text style={styles.selectorText}>Select the incident type</Text>
            <MaterialIcons name="navigate-next" size={25} color="#FFF" />
          </TouchableOpacity>
        )}
        {type && (
          <TouchableOpacity style={styles.selector} onPress={() => navigate('ReportTypeGroups')}>
            <Entypo
              name={iconName}
              size={wp('6%')}
              color="#ff6a30"
              style={{ marginLeft: wp('2%') }}
            />
            <Text style={styles.selectorText}>{type}</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.header}>Details</Text>
        <Text style={styles.subHeader}>Optional</Text>
        <TextInput
          value={details}
          style={styles.details}
          onChangeText={text => updateDetails({ type: type, details: text, iconName })}
          placeholder="Enter a description of the incident"
          placeholderTextColor="#666"
          multiline
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ report }) => {
  return {
    details: report.details,
    isLoading: report.isLoading
  };
};
export default connect(mapStateToProps, { updateDetails, resetReport })(ReportDetailsScreen);

const styles = StyleSheet.create({
  loadingOverlay: {
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    opacity: 0.5,
    position: 'absolute',
    zIndex: 1000
  },
  loadingIcon: {
    width: wp('50%'),
    height: wp('50%')
  },
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#000',
    height: hp('100%')
  },
  header: {
    width: wp('100%'),
    fontSize: wp('5%'),
    color: Colors.mainText,
    fontFamily: 'Arial-BoldMT',
    padding: wp('1%'),
    marginTop: hp('2%')
  },
  subHeader: {
    width: wp('100%'),
    fontSize: wp('3%'),
    color: '#444',
    marginBottom: hp('1%'),
    paddingLeft: '1%',
    fontFamily: 'Arial'
  },
  mainSelector: {
    width: wp('100%'),
    height: hp('8%'),
    marginBottom: hp('3%'),
    backgroundColor: '#181818',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    padding: wp('1%')
  },
  selector: {
    width: wp('100%'),
    height: hp('8%'),
    marginBottom: hp('3%'),
    backgroundColor: '#181818',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    padding: wp('1%')
  },
  selectorText: {
    fontSize: wp('5%'),
    color: '#FFF',
    marginLeft: wp('3%')
  },
  details: {
    width: wp('100%'),
    height: hp('15%'),
    marginBottom: hp('2%'),
    backgroundColor: '#181818',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    padding: wp('5%'),
    fontSize: wp('4%'),
    color: '#666'
  }
});
