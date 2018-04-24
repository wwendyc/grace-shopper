#!/usr/bin/env node

const {db, User, Product, Review, Order, Category} = require('../server/db')

const seed = async () => {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name: 'Cody', email: 'cody@email.com', password: '123'}),
    User.create({name: 'Grace Hopper', email: 'grace@hopper.com', password: '123', isAdmin: true})
  ])
  console.log(`seeded ${users.length} users`)
  console.log('email: ', users[0].email, ' password: 123')
  console.log('email: ', users[1].email, ' password: 123')

  const products = await Promise.all([
    Product.create({name: 'Scott "Squishy" Scribbles', description: 'Squishy may look like a wide-eyed wanderer — small, sweet, naïve and quiet, but he\'s got scaring down to an art and can teach you how to do it too!', price: 50, inventoryQuantity: 11, imgUrl: 'http://hbimg.b0.upaiyun.com/a81510b8bfc47fb0a78fd590dded3d6ae99be19e2436d-13OZTA_fw658' }),
    Product.create({name: 'Art', description: 'The ultimate free spirit, Art is a mysterious monster with a questionable background.', price: 40, inventoryQuantity: 10, imgUrl: 'https://www.conmishijos.com/assets/posts/0000/546-personajes-de-la-pelicula-monstruos-university-art.jpg' }),
    Product.create({name: 'Don Carlton', description: 'Midwestern sales monster turned Monsters University Scarer graduate can help you pursue a dream career in Scaring!', price: 60, inventoryQuantity: 12, imgUrl: 'https://vignette.wikia.nocookie.net/pixar/images/8/8d/MonstersUniversityDon1.png/revision/latest?cb=20130222130034' }),
    Product.create({name: 'Dean Hardscrabble', description: 'Learn from the legendary Dean Hardscrabble of the School of Scaring at Monsters University!', price: 300, inventoryQuantity: 2, imgUrl: 'http://4.bp.blogspot.com/-TXkjZ8TwoXM/USwUAy7_CSI/AAAAAAAALeg/WIkKl2knma4/s1600/Monsters_University_Dean-Hardscrabble.jpg' }),
    Product.create({name: 'Sulley\'s thunder roar', description: 'Learn how to dig deep down and let the scary out!', price: 100, inventoryQuantity: 17, imgUrl: 'https://www.conmishijos.com/assets/posts/0000/551-personajes-de-la-pelicula-monsters-university-sulley.jpg' }),
    Product.create({name: 'Scary tactics with Mike Wazowski', description: 'Strategies from the most knowledgable scarer in town. Learn how to get high scoring screams in every type of situation!', price: 100, inventoryQuantity: 17, imgUrl: 'http://cinemabh.com/wp-content/uploads/2013/02/Universidade-Monstros-Mike-Wazowski-poster.jpg' }),
  ])

  console.log(`seeded ${products.length} products`)

  const reviews = await Promise.all([
    Review.create({review: 'Best scaring class I\'ve ever taken!!', rating: 5, productId: 2, userId: 1 }),
    Review.create({review: 'I\'d give this course 10 stars if I could!', rating: 5, productId: 2, userId: 2  }),
    Review.create({review: 'Seriously, take this class!', rating: 5, productId: 5, userId: 1  }),
    Review.create({review: 'Thanks to these lessons, I feel like I can scare anyone!', rating: 4, productId: 4, userId: 1  }),
    Review.create({review: 'Loved the class but oops wrong rating.', rating: 1, productId: 3, userId: 1  }),
    Review.create({review: 'Loved the class but oops wrong rating.', rating: 5, productId: 6, userId: 1  })
  ])

  console.log(`seeded ${reviews.length} reviews`)

  const orders = await Promise.all([
    Order.create({
      products: [
        {
          id: 1,
          name: "Sulley's thunder roar",
          imgUrl: "https://www.conmishijos.com/assets/posts/0000/551-personajes-de-la-pelicula-monsters-university-sulley.jpg",
          quantity: 2,
          price: 150,
          subtotal: 300
        },
        {
          id: 2,
          name: "Scary tactics with Mike Wazowski",
          imgUrl: "http://cinemabh.com/wp-content/uploads/2013/02/Universidade-Monstros-Mike-Wazowski-poster.jpg",
          quantity: 3,
          price: 101.75,
          subtotal: 305.25
        }
      ],
      address: "123 fake st",
      email: "cody@email.com",
      status: "Created",
      checkoutDate: "04/18/2018",
      totalPrice: 605.25,
      createdAt: "04/18/2018",
      userId: 1
    }),
    Order.create({
      products: [
        {
          id: 3,
          name: `Scott "Squishy" Scribbles`,
          imgUrl: "http://hbimg.b0.upaiyun.com/a81510b8bfc47fb0a78fd590dded3d6ae99be19e2436d-13OZTA_fw658",
          quantity: 2,
          price: 230.50,
          subtotal: 461
        },
        {
          id: 4,
          name: "Art",
          imgUrl: "https://www.conmishijos.com/assets/posts/0000/546-personajes-de-la-pelicula-monstruos-university-art.jpg",
          quantity: 3,
          price: 375,
          subtotal: 1125
        }
      ],
      address: "123 fake st",
      email: "cody@email.com",
      status: "Processing",
      checkoutDate: "04/19/2018",
      totalPrice: 1586,
      createdAt: "04/19/2018",
      userId: 1
    })
  ])

  console.log(`seeded ${orders.length} orders`)

  const categories = await Promise.all([
    Category.create({name: 'scaring tactics'}),
    Category.create({name: 'thunder roar'}),
    Category.create({name: 'lessons'})
  ])

  console.log(`seeded ${categories.length} categories`)

  console.log(`seeded all data successfully`)
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

console.log('seeding...')
