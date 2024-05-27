import React from 'react'

type DropDownItem = {
  title: string
  categories: (string | null)[]
  link: string
}

type DropDown = {
  navItem?: string
  items: DropDownItem[]
}

const DropDownItems: DropDown[] = [
  {
    navItem: 'Features',
    items: [
      {
        title: 'Articles',
        categories: ['Features', 'Extracts', 'Quizzes', 'View all articles'],
        link: '/',
      },
      {
        title: 'Most Viewed',
        categories: [
          'The best new books of 2024',
          '100 must-read classic books',
          'The best book club reads',
          'Books guaranteed to make you laugh',
        ],
        link: '/',
      },
      {
        title: 'Children`s Articles',
        categories: [
          'Recommendations',
          'Extracts',
          'Crafts & Activities',
          'Quizzes',
          'View all children`s articles',
        ],
        link: '/',
      },
      {
        title: 'Sign up for our newsletter',
        categories: [null],
        link: '/',
      },
      {
        title: 'Podcasts',
        categories: [null],
        link: '/',
      },
    ],
  },
]

export default DropDownItems
