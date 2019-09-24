# extend the blog API

Add comments to a blog

## Schema

```C#
public class Blog{
  public int Id { get; set; }
  public string Title { get; set; }
  public string Author { get; set; }
  public DateTime DateCreated { get; set; }
  public string Content { get; set; }
  public List<Comment> Comments {get;set;}
}

public class Comment {
  public int Id {get;set;}
  public string Content {get;set;}
  public string Author { get; set; }
  public DateTime DateCreated { get; set; }
  public int BlogId {get;set;}
  public Blog Blog {get;set;}
}

```

## API Definiation

``
