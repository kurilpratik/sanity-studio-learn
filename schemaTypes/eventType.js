import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: ['details', 'editorial'],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      group: 'details',
      validation: (rule) => rule.required().error(`required to generate a page on the website`),
      hidden: ({document}) => !document?.name, // hide the field if name is not set (progressive disclosure)
    }),
    defineField({
      name: 'eventType',
      type: 'string',
      options: {
        list: ['in-person', 'virtual'],
        layout: 'radio', // or 'dropdown'
        direction: 'horizontal', // 'horizontal' or 'vertical'
      },
      group: 'details',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      group: 'details',
    }),
    defineField({
      name: 'doorsOpen',
      type: 'number',
      description: 'Number of minutes before the start time for admission',
      initialValue: 60,
      group: 'details',
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
      readOnly: ({document}) => document?.eventType === 'virtual', // make the field read only if the event is virtual
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value && context?.document?.eventType === 'virtual') {
            // value refers to the currect field and context refers to the whole document and its fields
            return 'Only in-person events can have a venue'
          }
          return true
        }),
    }),
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{type: 'artist'}],
      group: 'details',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'editorial',
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}], // this is a rich text field
      group: 'editorial',
    }),
    defineField({
      name: 'tickets',
      type: 'url',
      group: 'details',
    }),
  ],
  preview: {
    select: {
      //   title: 'name',
      //   subtitle: 'headline.name',
      //   media: 'image',
      name: 'name',
      venue: 'venue.name',
      artist: 'headline.name',
      date: 'date',
      image: 'image',
    },
    prepare({name, venue, artist, date, image}) {
      const nameFormatted = name || 'Untitled Event'
      const dateFormatted = date
        ? new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        : 'No date set'
      return {
        title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
        subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
        media: image || CalendarIcon,
      }
    },
  },
})

// defineType and defineField are optional, we can make this simply by using objects but they help us by suggestions and auto completes.
