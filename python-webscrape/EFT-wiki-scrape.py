from urllib.request import urlopen as uReq

from bs4 import BeautifulSoup as soup

etk_Wiki_URL = "https://escapefromtarkov.gamepedia.com/Ballistics"

uClient = uReq(etk_Wiki_URL)
wiki_HTML = uClient.read()
uClient.close()

page_soup = soup(wiki_HTML, "html.parser")
container = page_soup.findAll("table", {"class" : "wikitable sortable"})
print(len(container))