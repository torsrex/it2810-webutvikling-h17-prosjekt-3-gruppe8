import React from 'react'
import {months} from '../../utils'
import { StyleSheet, Text, View, Button } from 'react-native'


const Header = ({year, month, changeDate}) => {

  return (
    <View className="calendar-header">
      <View>
        <Text>{year} {months[month]}</Text>
      </View>
      <View>
        <Button
          title="<"
          className="step-month-btn prev-month"
          onPress={() => changeDate(-1)}/>
          <Button
            title="Today"
            className="step-month-btn today-month"
            onPress={() => changeDate(0)}
          />
          <Button
            title=">"
            className="step-month-btn next-month"
            onPress={() => changeDate(1)}/>
      </View>
    </View>
  )
}

export default Header
