class Link < ActiveRecord::Base
  belongs_to :user

  validates :title,
            :url,
             presence: true
  validates :url, :url => true

  enum status: [:not, :hotread, :hottest]

  def save_link(params, user)
    self.title = params[:title]
      self.url = params[:url]
    self.user  = user
    self.save
  end

end
