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
  {} -> attributes to return
  -> {} => referencing values of another object
  "" -> Create and return new attribute
