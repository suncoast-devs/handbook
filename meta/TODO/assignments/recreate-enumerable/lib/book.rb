class Book
  attr_reader :title, :year, :author, :page_count

  def initialize(title, year, author, page_count)
    @title, @year, @author, @page_count = title, year, author, page_count
  end
end

