require "rails_helper"

describe "can filter to view either read or unread links", :js => :true do
  scenario "viewing only read links" do
    user = create(:user)
    link = create(:link, title: "BBC", url: "http://www.bbc.co.uk", user: user)
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

    visit links_path
    click_on "Mark as Read"

    within('.link .read-status') do
      expect(page).to have_text("true")
    end
    create_list(:link, 3, user: user)
    click_on "Only Read Links"

    within('#my-links') do
      expect(page).to have_text("BBC")
      expect(page).to have_text("http://www.bbc.co.uk")
      expect(page).to_not have_text("link-")
      expect(page).to have_selector('.link', count: 1)
    end
  end

  scenario "viewing only unread links" do
    user = create(:user)
    link = create(:link, title: "BBC", url: "http://www.bbc.co.uk", user: user)
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

    visit links_path

    click_on "Mark as Read"

    click_on "Only Unread Links"

    within('#my-links') do
      expect(page).to_not have_text("BBC")
      expect(page).to_not have_text("http://www.bbc.co.uk")
    end
  end
end
