import React, { useState } from 'react';
import { Keyboard, Text, View, Button, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import TextField from 'components/common/TextField';
import TextStyles from 'helpers/TextStyles';
import { setDataExpirationDays } from 'actions/MoviesActions';
import { getDataExpirationDays } from 'selectors/MoviesSelectors';

import strings from 'localization';

const Configuration = () => {
  const [days, setDays] = useState(1);
  const [showSave, setShowSave] = useState(false);
  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(setDataExpirationDays({ days }));
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
    <Pressable onPress={() => Keyboard.dismiss()}>
      <Text style={[TextStyles.textRegular, styles.text]}>
        {strings.dataExpirationDescription}
      </Text>
      <Text style={[TextStyles.boldTitle, styles.text]}>
        {strings.dataExpirationTitle}
      </Text>
      <Text style={[TextStyles.boldTitle, styles.text]}>
        {strings.currentExpirationDays} {dataExpirationDays}
      </Text>
      <TextField
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
  );
};

export default Configuration;
