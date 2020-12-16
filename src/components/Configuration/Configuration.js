import React, { useState } from 'react';
import { Keyboard, Text, View, Button, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import getStyles from './styles';
import TextField from 'components/common/TextField';
import TextStyles from 'helpers/TextStyles';
import { setDataExpirationDays } from 'actions/MoviesActions';
import { getDataExpirationDays } from 'selectors/MoviesSelectors';

import strings from 'localization';

const Configuration = () => {
  const styles = getStyles(useTheme());
  const [days, setDays] = useState('');
  const [showSave, setShowSave] = useState(false);
  const dispatch = useDispatch();
  const handleSave = () => {
    if (!days) {
      return;
    }
    dispatch(setDataExpirationDays({ days: Math.round(days) }));
    setShowSave(true);
    setTimeout(() => {
      setShowSave(false);
    }, 3000);
    Keyboard.dismiss();
  };
  const dataExpirationDays = useSelector(state => getDataExpirationDays(state));
  const handleChangeText = value => {
    setDays(value);
  };
  return (
    <View style={styles.container} testID="configuration-view">
      <Pressable onPress={() => Keyboard.dismiss()}>
        <Text style={[TextStyles.textRegular, styles.text]}>
          {strings.dataExpirationDescription}
        </Text>
        <Text style={[TextStyles.boldTitle, styles.text]}>
          {strings.currentExpirationDays} {dataExpirationDays}
        </Text>
        <Text
          style={[TextStyles.boldTitle, styles.text, styles.noMarginBottom]}
        >
          {strings.setDataExpirationDays}
        </Text>
        <TextField
          placeholder={strings.days}
          autoFocus
          onChangeText={handleChangeText}
          style={styles.input}
          keyboardType="numeric"
        />
        {showSave && <Text style={styles.saved}>{strings.changesSaved}</Text>}
        <View style={styles.button}>
          <Button onPress={handleSave} title={strings.save} />
        </View>
      </Pressable>
    </View>
  );
};

export default Configuration;
