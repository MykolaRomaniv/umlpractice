import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

import analytics from 'assets/analytics.jpg'
import constructing from 'assets/constructing.jpg'
import modeling from 'assets/modeling.jpg'
import designing from 'assets/designing.jpg'
import testing from 'assets/testing.jpg'

import routes from 'app/constants/routes'
import useStyles from './styles'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        {'Your Website\r'}
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const cards: { name: string; img: string }[] = [
  {
    name: 'Аналіз вимог',
    img: analytics,
  },
  {
    name: 'Проектування',
    img: designing,
  },
  {
    name: 'Моделювання',
    img: modeling,
  },
  {
    name: 'Конструювання',
    img: constructing,
  },
  {
    name: 'Тестування',
    img: testing,
  },
]

const Album = (): JSX.Element => {
  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {'Категорії вправ\r'}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              {
                'ЖЦ ПЗ складається з 5-ти етапів. Виберіть етап та отримайте вправи створені вашим викладачем'
              }
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    {'Список усіх вправ\r'}
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    {'Статистика\r'}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.name} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.img}
                    title={card.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                      {
                        'This is a media card. You can use this section to describe the content.\r'
                      }
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Link
                      component={RouterLink}
                      to={`/${routes.exercisesList}`}
                      variant="body2"
                    >
                      <Button variant="contained" color="primary">
                        {'Завдання'}
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          {'Footer\r'}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          {'Something here to give the footer a purpose!\r'}
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </>
  )
}

export default Album
