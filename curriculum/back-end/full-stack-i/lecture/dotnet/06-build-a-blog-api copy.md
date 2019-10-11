# Build a Blog API

Build a RESTful API to store blogs.

## Schema

```C#
public class Comment {
  public int Id { get; set; }
  public string Content { get; set; }
  public DateTime DateCraeted { get; set; }
  public int BlogId { get; set; }
  public Blog Blog { get; set; }
}

```

## API Definiation
