```bash
*[_type == "event"
  && eventType == "in-person"
  && date > now()
 ] {
  name,
    headline -> {
      name
    },
    "isUpcoming": true
 }
```

- -> Return
  [] -> Filter
  {} -> Projection - attributes to return
  -> {} => referencing values of another object
  "" -> Create and return new attribute
