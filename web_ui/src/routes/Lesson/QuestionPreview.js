import React from 'react'
import { Card } from 'semantic-ui-react'

const QuestionPreview = ({ data = [] }) => data.map(({ title, answers }) => (
  <Card key={title}>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Description>
        <Card.Meta>Ответы</Card.Meta>
        <ul>
          {answers.map(({ value, correct }) => (
            <li key={value} style={{ color: correct ? 'green' : 'black', fontWeight: correct ? 'bold' : 'normal' }}>
              {value}
            </li>
          ))}
        </ul>
      </Card.Description>
    </Card.Content>
  </Card>
))

export default QuestionPreview
